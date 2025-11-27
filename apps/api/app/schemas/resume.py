from pydantic import BaseModel
from typing import Optional


class Resume(BaseModel):
    id: int
    original_filename: str
    mime_type: str = "application/pdf"
    file_url: str
    created_at: Optional[str] = None

    class Config:
        from_attributes = True


