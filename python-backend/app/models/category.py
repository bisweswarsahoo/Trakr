from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # null for default categories
    name = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    color = Column(String, nullable=False)
    type = Column(String, nullable=False) # 'income' or 'expense'
    is_default = Column(Boolean, default=False)
