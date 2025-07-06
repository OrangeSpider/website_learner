"""Simple in-memory user management service."""

from __future__ import annotations

import secrets

from typing import Dict

from ..models.user_models import UserInfo

# Stores email -> password
_registered_users: Dict[str, str] = {}
# Stores token -> email
_active_tokens: Dict[str, str] = {}


def register_user(email: str, password: str) -> bool:
    """Register a new user. Returns True if created, False if user exists."""
    if email in _registered_users:
        return False
    _registered_users[email] = password
    return True


def authenticate_user(email: str, password: str) -> str | None:
    """Authenticate a user and return a token if successful."""
    if _registered_users.get(email) != password:
        return None
    token = secrets.token_urlsafe(16)
    _active_tokens[token] = email
    return token


def logout(token: str) -> None:
    """Invalidate the given token."""
    _active_tokens.pop(token, None)


def delete_user(email: str) -> bool:
    """Delete a registered user. Returns True if removed."""
    if email in _registered_users:
        _registered_users.pop(email)
        # remove all tokens for the user
        tokens_to_remove = [t for t, e in _active_tokens.items() if e == email]
        for t in tokens_to_remove:
            _active_tokens.pop(t, None)
        return True
    return False


def list_users() -> list[UserInfo]:
    """Return all registered users."""
    return [UserInfo(email=e) for e in _registered_users]

