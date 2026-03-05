from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api import deps
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.transaction import IncomeCreate, TransactionUpdate, Transaction as TransactionSchema

router = APIRouter()

@router.get("/", response_model=List[TransactionSchema])
def read_income(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    income = db.query(Transaction).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'income'
    ).order_by(Transaction.date.desc()).offset(skip).limit(limit).all()
    return income

@router.post("/", response_model=TransactionSchema)
def create_income(
    income_in: IncomeCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    income_data = income_in.model_dump()
    db_income = Transaction(**income_data, user_id=current_user.id)
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@router.put("/{id}", response_model=TransactionSchema)
def update_income(
    id: int,
    income_in: TransactionUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    db_income = db.query(Transaction).filter(
        Transaction.id == id, 
        Transaction.user_id == current_user.id,
        Transaction.type == 'income'
    ).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")
    
    update_data = income_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_income, field, value)
    
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@router.delete("/{id}")
def delete_income(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    db_income = db.query(Transaction).filter(
        Transaction.id == id, 
        Transaction.user_id == current_user.id,
        Transaction.type == 'income'
    ).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")
    
    db.delete(db_income)
    db.commit()
    return {"ok": True}
