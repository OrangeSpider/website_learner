from fastapi.testclient import TestClient

from ..main import app
from ..api import user

client = TestClient(app)


def setup_function(function):
    user.user_db.clear()
    user.active_tokens.clear()


def test_user_flow():
    # register
    resp = client.post("/register", json={"email": "test@example.com", "password": "secret"})
    assert resp.status_code == 200

    # login
    resp = client.post("/login", json={"email": "test@example.com", "password": "secret"})
    assert resp.status_code == 200
    token = resp.json()["token"]
    assert token

    # list
    resp = client.get("/users")
    assert resp.status_code == 200
    assert "test@example.com" in resp.json()["users"]

    # logout
    resp = client.post("/logout", json={"token": token})
    assert resp.status_code == 200

    # delete
    resp = client.delete("/users/test@example.com")
    assert resp.status_code == 200
    resp = client.get("/users")
    assert "test@example.com" not in resp.json()["users"]


def test_login_failure():
    client.post("/register", json={"email": "foo@bar.com", "password": "pw"})
    resp = client.post("/login", json={"email": "foo@bar.com", "password": "wrong"})
    assert resp.status_code == 401
