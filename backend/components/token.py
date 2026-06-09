import jwt
from datetime import datetime, timedelta, timezone
from jwt import InvalidTokenError
from fastapi import HTTPException

Key = "rtyuiopdhqgd52e6738e9012e2bdhjwedweoiowecwcweikuw"
ALGORITHM = "HS256"
EXPIRES_IN = 60

def create_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=EXPIRES_IN)
    }
    token = jwt.encode(payload, Key, algorithm=ALGORITHM)
    return token

def verify_token(token: str, credentials_exception) :
    try:
        payload = jwt.decode(token, Key, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except InvalidTokenError:
        raise credentials_exception