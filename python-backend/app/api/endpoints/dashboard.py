from datetime import datetime, timedelta, time
from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from app.api.deps import get_current_user, get_db
from app.models.transaction import Transaction
from app.models.category import Category
from app.models.user import User

router = APIRouter()


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns dashboard summary data:
    - Today's income & expenses
    - Monthly totals
    - Chart data (category breakdown, monthly trend)
    """
    today = datetime.now().date()
    today_start = datetime.combine(today, time.min)
    today_end = datetime.combine(today, time.max)

    # Current month range
    month_start = today.replace(day=1)
    if today.month == 12:
        month_end = today.replace(year=today.year + 1, month=1, day=1)
    else:
        month_end = today.replace(month=today.month + 1, day=1)

    # --- Today's totals ---
    today_income = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "income",
            Transaction.date >= today_start,
            Transaction.date <= today_end,
        )
        .scalar()
    )

    today_expense = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
            Transaction.date >= today_start,
            Transaction.date <= today_end,
        )
        .scalar()
    )

    # --- Monthly totals ---
    monthly_income = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "income",
            Transaction.date >= datetime.combine(month_start, time.min),
            Transaction.date < datetime.combine(month_end, time.min),
        )
        .scalar()
    )

    monthly_expense = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
            Transaction.date >= datetime.combine(month_start, time.min),
            Transaction.date < datetime.combine(month_end, time.min),
        )
        .scalar()
    )

    # --- Category breakdown (expenses this month) ---
    category_data = (
        db.query(
            Category.name,
            Category.color,
            Category.icon,
            func.sum(Transaction.amount).label("total"),
            func.count(Transaction.id).label("count"),
        )
        .join(Category, Transaction.category_id == Category.id)
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
            Transaction.date >= datetime.combine(month_start, time.min),
            Transaction.date < datetime.combine(month_end, time.min),
        )
        .group_by(Category.name, Category.color, Category.icon)
        .all()
    )

    pie_data = [
        {"name": row.name, "color": row.color, "icon": row.icon, "value": float(row.total), "count": row.count}
        for row in category_data
    ]

    # --- Monthly trend (last 6 months) ---
    monthly_trend = []
    for i in range(5, -1, -1):
        m_date = today - timedelta(days=30 * i)
        m_start = m_date.replace(day=1)
        if m_start.month == 12:
            m_end = m_start.replace(year=m_start.year + 1, month=1, day=1)
        else:
            m_end = m_start.replace(month=m_start.month + 1, day=1)

        m_income = (
            db.query(func.coalesce(func.sum(Transaction.amount), 0))
            .filter(
                Transaction.user_id == current_user.id,
                Transaction.type == "income",
                Transaction.date >= datetime.combine(m_start, time.min),
                Transaction.date < datetime.combine(m_end, time.min),
            )
            .scalar()
        )
        m_expense = (
            db.query(func.coalesce(func.sum(Transaction.amount), 0))
            .filter(
                Transaction.user_id == current_user.id,
                Transaction.type == "expense",
                Transaction.date >= datetime.combine(m_start, time.min),
                Transaction.date < datetime.combine(m_end, time.min),
            )
            .scalar()
        )

        monthly_trend.append(
            {
                "month": m_start.strftime("%b %Y"),
                "income": float(m_income),
                "expense": float(m_expense),
                "net": float(m_income) - float(m_expense),
            }
        )

    # --- Recent transactions ---
    recent = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .order_by(Transaction.date.desc())
        .limit(10)
        .all()
    )

    recent_transactions = [
        {
            "id": t.id,
            "title": t.title,
            "amount": float(t.amount),
            "type": t.type,
            "date": t.date.isoformat() if t.date else None,
        }
        for t in recent
    ]

    return {
        "today": {
            "income": float(today_income),
            "expense": float(today_expense),
            "net": float(today_income) - float(today_expense),
        },
        "monthly": {
            "income": float(monthly_income),
            "expense": float(monthly_expense),
            "net": float(monthly_income) - float(monthly_expense),
        },
        "charts": {
            "category_breakdown": pie_data,
            "monthly_trend": monthly_trend,
        },
        "recent_transactions": recent_transactions,
    }
