from sqlalchemy.orm import Session
from components.token import create_token, verify_token
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from components.database import get_db
from components import models, schema, utils
from sqlalchemy import func

router = APIRouter(
    prefix="/login",
    tags=["login"],
)

@router.post("/", response_model=schema.Token)
async def login(credential: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = db.query(models.User).filter(func.lower(models.User.username) == credential.username.lower()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = "No account exists with that email or password, please register an account"
                                                                                )
    if not utils.verify(credential.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect Username or Password!")
    token = create_token(credential.username)
    return {"access_token": token, "token_type": "bearer"}