import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to PromptArena!"}

def test_get_problems():
    response = client.get("/api/problems")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_submission():
    response = client.post("/api/submissions", json={"prompt": "Example prompt", "user_id": 1})
    assert response.status_code == 201
    assert "id" in response.json()