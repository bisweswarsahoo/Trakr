from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Trakr Financial Service"
    API_V1_STR: str = "/api/v1"

    # Database connection string (Supabase PostgreSQL)
    DATABASE_URL: str

    # Internal service authentication key (shared with Node.js gateway)
    INTERNAL_SERVICE_KEY: str = ""

    # Supabase Storage (for receipt uploads)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
