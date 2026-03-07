from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, get_db
from app.models.category import Category
from app.models.user import User
from app.schemas.category import CategoryCreate, CategoryUpdate, Category as CategorySchema

router = APIRouter()


@router.get("/", response_model=List[CategorySchema])
def read_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Return user specific categories and default categories (user_id=None)
    categories = (
        db.query(Category)
        .filter((Category.user_id == current_user.id) | (Category.user_id == None))
        .all()
    )
    return categories


@router.post("/", response_model=CategorySchema)
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    category_data = category_in.model_dump()
    db_category = Category(**category_data, user_id=current_user.id, is_default=False)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


@router.put("/{id}", response_model=CategorySchema)
def update_category(
    id: int,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_category = db.query(Category).filter(Category.id == id, Category.user_id == current_user.id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found or not owned by user")

    update_data = category_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)

    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


@router.delete("/{id}")
def delete_category(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_category = db.query(Category).filter(Category.id == id, Category.user_id == current_user.id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found or not owned by user")
    if db_category.is_default:
        raise HTTPException(status_code=400, detail="Cannot delete default category")

    db.delete(db_category)
    db.commit()
    return {"ok": True}
