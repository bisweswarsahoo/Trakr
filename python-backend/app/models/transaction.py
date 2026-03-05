from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False, index=True) # 'income' or 'expense'
    amount = Column(Numeric(10, 2), nullable=False)
    title = Column(String, nullable=False)
    date = Column(DateTime(timezone=True), nullable=False, default=func.now())
    payment_method = Column(String, nullable=False)
    
    # Expense specific fields
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    vendor = Column(String, nullable=True)
    receipt_url = Column(String, nullable=True)
    
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
