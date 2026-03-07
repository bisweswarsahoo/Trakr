from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, get_db
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.transaction import ExpenseCreate, TransactionUpdate, Transaction as TransactionSchema
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=List[TransactionSchema])
def read_expenses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expenses = (
        db.query(Transaction)
        .filter(
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
        )
        .order_by(Transaction.date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return expenses


@router.post("/", response_model=TransactionSchema)
def create_expense(
    expense_in: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expense_data = expense_in.model_dump()
    db_expense = Transaction(**expense_data, user_id=current_user.id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@router.put("/{id}", response_model=TransactionSchema)
def update_expense(
    id: int,
    expense_in: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_expense = (
        db.query(Transaction)
        .filter(
            Transaction.id == id,
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
        )
        .first()
    )
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    update_data = expense_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_expense, field, value)

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@router.delete("/{id}")
def delete_expense(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_expense = (
        db.query(Transaction)
        .filter(
            Transaction.id == id,
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
        )
        .first()
    )
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(db_expense)
    db.commit()
    return {"ok": True}


@router.post("/{id}/receipt")
async def upload_receipt(
    id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload receipt image. Uses Supabase Storage if configured, otherwise local filesystem."""
    db_expense = (
        db.query(Transaction)
        .filter(
            Transaction.id == id,
            Transaction.user_id == current_user.id,
            Transaction.type == "expense",
        )
        .first()
    )
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    # Try Supabase Storage if configured
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        try:
            from supabase import create_client
            import uuid

            supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            file_ext = file.filename.split(".")[-1] if file.filename else "jpg"
            file_name = f"receipts/{current_user.id}/{uuid.uuid4()}.{file_ext}"
            file_content = await file.read()

            supabase.storage.from_("receipts").upload(file_name, file_content)
            receipt_url = supabase.storage.from_("receipts").get_public_url(file_name)

            db_expense.receipt_url = receipt_url
            db.commit()
            db.refresh(db_expense)
            return db_expense
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload to Supabase Storage: {str(e)}")
    else:
        # Fallback: local filesystem
        import shutil
        import os
        import uuid

        UPLOAD_DIR = "uploads/receipts"
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        file_ext = file.filename.split(".")[-1] if file.filename else "jpg"
        file_name = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, file_name)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        receipt_url = f"/uploads/receipts/{file_name}"
        db_expense.receipt_url = receipt_url
        db.commit()
        db.refresh(db_expense)
        return db_expense
