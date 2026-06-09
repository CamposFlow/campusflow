from components.token import Key, ALGORITHM
from pwdlib import PasswordHash

password_hasher = PasswordHash.recommended()

def hashed(password:str):
    return password_hasher.hash(password)

def verify(password:str, hashed_password:str):
    return password_hasher.verify(password, hashed_password)