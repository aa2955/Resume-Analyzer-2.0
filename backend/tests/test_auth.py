import pytest

def test_register_user(client):
    response = client.post("/api/register", data={
        "username": "testuser",
        "email": "test@example.com",
        "password": "TestPassword123"
    })
    assert response.status_code == 201
    assert response.json()["message"] == "User registered successfully."

def test_login_user(client):
    client.post("/api/register", data={
        "username": "testuser",
        "email": "test@example.com",
        "password": "TestPassword123"
    })
    response = client.post("/api/login", data={
        "username": "testuser",
        "password": "TestPassword123"
    })
    assert response.status_code == 200
    assert "token" in response.json()
