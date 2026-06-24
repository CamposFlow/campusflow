from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer
from components import utils, models, schema
from typing import List
from sqlalchemy.orm import Session
from components.database import get_db, engine
from components.token import verify_token
from components.dependency import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

@router.post("/", status_code=201, response_model=schema.UserResponse)
async def create_user(user: schema.UserCreate, db: Session= Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = utils.hashed(user.password)
    user.password = hashed_password
    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/me", response_model=schema.UserResponse)
async def read_user(current_user: models.User = Depends(get_current_user)):
    return current_user