from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    icon: str
    color: str
    type: str # 'income' or 'expense'

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    type: Optional[str] = None

class Category(CategoryBase):
    id: int
    user_id: Optional[int]
    is_default: bool

    class Config:
        from_attributes = True
