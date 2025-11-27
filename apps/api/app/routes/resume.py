from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional
from pathlib import Path
from datetime import datetime
import shutil
import os

from app.core.database import get_db
from app.models.resume import Resume as ResumeModel
from app.schemas.resume import Resume as ResumeSchema


router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_DIR = Path("app/uploads/resumes")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.get("/latest", response_model=Optional[ResumeSchema])
def get_latest_resume(request: Request, db: Session = Depends(get_db)):
    """Get the latest uploaded resume (or null if none)."""
    resume = db.query(ResumeModel).order_by(ResumeModel.id.desc()).first()
    if not resume:
        return None

    file_url = request.url_for("download_resume", resume_id=resume.id)
    return ResumeSchema(
        id=resume.id,
        original_filename=resume.original_filename,
        mime_type=resume.mime_type,
        file_url=str(file_url),
        created_at=resume.created_at,
    )


@router.get("/{resume_id}/file", response_class=FileResponse, name="download_resume")
def download_resume(resume_id: int, db: Session = Depends(get_db)):
    """Download a specific resume PDF file."""
    resume = db.query(ResumeModel).filter(ResumeModel.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    file_path = Path(resume.file_path)
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Resume file not found on disk")

    return FileResponse(
        path=str(file_path),
        media_type=resume.mime_type or "application/pdf",
        filename=resume.original_filename,
    )


@router.post("/", response_model=ResumeSchema, status_code=201)
def upload_resume(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """Upload a new resume PDF. Stores file on disk and metadata in DB."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    safe_name = file.filename.replace(" ", "_")
    stored_filename = f"{timestamp}_{safe_name}"
    stored_path = UPLOAD_DIR / stored_filename

    with stored_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_resume = ResumeModel(
        file_path=str(stored_path),
        original_filename=file.filename,
        mime_type=file.content_type or "application/pdf",
        created_at=datetime.utcnow().isoformat(),
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)

    file_url = request.url_for("download_resume", resume_id=db_resume.id)
    return ResumeSchema(
        id=db_resume.id,
        original_filename=db_resume.original_filename,
        mime_type=db_resume.mime_type,
        file_url=str(file_url),
        created_at=db_resume.created_at,
    )


@router.delete("/{resume_id}", status_code=204)
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    """Delete a resume and its file from disk."""
    resume = db.query(ResumeModel).filter(ResumeModel.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    file_path = Path(resume.file_path)
    if file_path.is_file():
        try:
            os.remove(file_path)
        except OSError:
            # Don't fail deletion if file removal has issues
            pass

    db.delete(resume)
    db.commit()
    return None


