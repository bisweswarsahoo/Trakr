from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Shop Expense Manager API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super_secret_key_for_development_only_please_change"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database connection string
    DATABASE_URL: str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
