from datetime import datetime, time, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.api.deps import get_current_user, get_db
from app.models.transaction import Transaction
from app.models.category import Category
from app.models.user import User

router = APIRouter()


def _get_date_range(period: str):
    """Calculate start/end date for a given period."""
    today = datetime.now().date()

    if period == "daily":
        start = today
        end = today + timedelta(days=1)
    elif period == "weekly":
        start = today - timedelta(days=today.weekday())
        end = start + timedelta(days=7)
    elif period == "monthly":
        start = today.replace(day=1)
        if today.month == 12:
            end = today.replace(year=today.year + 1, month=1, day=1)
        else:
            end = today.replace(month=today.month + 1, day=1)
    elif period == "yearly":
        start = today.replace(month=1, day=1)
        end = today.replace(year=today.year + 1, month=1, day=1)
    else:
        start = today.replace(day=1)
        end = today + timedelta(days=1)

    return datetime.combine(start, time.min), datetime.combine(end, time.min)


def _build_report(period: str, db: Session, user_id: int):
    """Generate a report for a given period."""
    start, end = _get_date_range(period)

    query = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.date >= start,
        Transaction.date < end,
    )

    transactions = query.all()
    total_income = sum(float(t.amount) for t in transactions if t.type == "income")
    total_expense = sum(float(t.amount) for t in transactions if t.type == "expense")

    return {
        "period": period,
        "start_date": start.isoformat(),
        "end_date": end.isoformat(),
        "total_income": total_income,
        "total_expense": total_expense,
        "net_profit": total_income - total_expense,
        "transaction_count": len(transactions),
    }


@router.get("/summary")
def get_summary(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Transaction).filter(Transaction.user_id == current_user.id)

    if start_date:
        query = query.filter(Transaction.date >= start_date)
    if end_date:
        query = query.filter(Transaction.date <= end_date)

    transactions = query.all()

    total_income = sum(float(t.amount) for t in transactions if t.type == "income")
    total_expense = sum(float(t.amount) for t in transactions if t.type == "expense")
    net_profit = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_profit": net_profit,
    }


@router.get("/daily")
def get_daily_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return _build_report("daily", db, current_user.id)


@router.get("/weekly")
def get_weekly_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return _build_report("weekly", db, current_user.id)


@router.get("/monthly")
def get_monthly_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return _build_report("monthly", db, current_user.id)


@router.get("/yearly")
def get_yearly_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return _build_report("yearly", db, current_user.id)


@router.get("/category")
def get_category_report(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = (
        db.query(
            Category.id.label("category_id"),
            Category.name.label("category_name"),
            Category.color,
            Category.icon,
            func.sum(Transaction.amount).label("total"),
            func.count(Transaction.id).label("count"),
        )
        .join(Category, Transaction.category_id == Category.id)
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
        )
    )

    if start_date:
        query = query.filter(Transaction.date >= start_date)
    if end_date:
        query = query.filter(Transaction.date <= end_date)

    result = query.group_by(Category.id, Category.name, Category.color, Category.icon).all()

    return [
        {
            "category_id": r.category_id,
            "category_name": r.category_name,
            "color": r.color,
            "icon": r.icon,
            "total": float(r.total),
            "count": r.count,
        }
        for r in result
    ]
