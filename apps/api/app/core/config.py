from pydantic_settings import BaseSettings
import os
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    
    # CORS Configuration - comma-separated origins or "*" for all
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    
    # Environment: development, staging, production
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Optional: API Secret Key for future authentication
    API_SECRET_KEY: str = os.getenv("API_SECRET_KEY", "")
    
    # Optional: Logging level
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    class Config:
        env_file = ".env"
    
    def get_cors_origins(self) -> List[str]:
        """Parse CORS_ORIGINS string into a list."""
        if self.CORS_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()