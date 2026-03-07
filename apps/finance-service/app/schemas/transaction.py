from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

class TransactionBase(BaseModel):
    amount: Decimal
    title: str
    date: datetime
    payment_method: str
    notes: Optional[str] = None

class ExpenseCreate(TransactionBase):
    type: str = 'expense'
    category_id: int
    vendor: Optional[str] = None
    receipt_url: Optional[str] = None

class IncomeCreate(TransactionBase):
    type: str = 'income'

class TransactionUpdate(BaseModel):
    amount: Optional[Decimal] = None
    title: Optional[str] = None
    date: Optional[datetime] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None
    category_id: Optional[int] = None
    vendor: Optional[str] = None
    receipt_url: Optional[str] = None

class Transaction(TransactionBase):
    id: int
    user_id: int
    type: str
    category_id: Optional[int]
    vendor: Optional[str]
    receipt_url: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
