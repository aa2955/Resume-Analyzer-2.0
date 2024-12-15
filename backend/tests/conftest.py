import pytest
from fastapi.testclient import TestClient
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app  # Import your FastAPI app

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client
