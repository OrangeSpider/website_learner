from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import secrets

router = APIRouter()

# In-memory storage for users and active tokens
user_db: dict[str, str] = {}
active_tokens: dict[str, str] = {}


class Credentials(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    token: str


class UserList(BaseModel):
    users: list[str]


@router.post("/register")
async def register(creds: Credentials) -> dict[str, str]:
    if creds.email in user_db:
        raise HTTPException(status_code=400, detail="User already exists")
    user_db[creds.email] = creds.password
    return {"message": "registered"}


@router.post("/login", response_model=Token)
async def login(creds: Credentials) -> Token:
    if user_db.get(creds.email) != creds.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = secrets.token_urlsafe(16)
    active_tokens[token] = creds.email
    return Token(token=token)


@router.post("/logout")
async def logout(t: Token) -> dict[str, str]:
    active_tokens.pop(t.token, None)
    return {"message": "logged out"}


@router.delete("/users/{email}")
async def delete_user(email: str) -> dict[str, str]:
    if email not in user_db:
        raise HTTPException(status_code=404, detail="User not found")
    del user_db[email]
    for tok, em in list(active_tokens.items()):
        if em == email:
            del active_tokens[tok]
    return {"message": "deleted"}


@router.get("/users", response_model=UserList)
async def list_users() -> UserList:
    return UserList(users=list(user_db.keys()))
