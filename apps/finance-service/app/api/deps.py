from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database import get_db
from app.models.user import User


def get_current_user(
    x_service_key: str = Header(None, alias="X-Service-Key"),
    x_user_id: str = Header(None, alias="X-User-ID"),
    db: Session = Depends(get_db),
) -> User:
    """
    Internal service authentication.
    Trusts requests from the Node.js API gateway that include:
      - X-Service-Key: shared secret between services
      - X-User-ID: the authenticated user's ID (already verified by Node.js JWT middleware)
    """
    # Validate internal service key
    if not x_service_key or x_service_key != settings.INTERNAL_SERVICE_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing service key",
        )

    # Validate user ID header
    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing user ID header",
        )

    try:
        user_id = int(x_user_id)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )

    # Look up user in database
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user
