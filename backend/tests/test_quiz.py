from fastapi.testclient import TestClient

from ..main import app
from ..services import quiz_generator


client = TestClient(app)


def test_generate_quiz_endpoint(monkeypatch):
    sample = [
        {"question": "q1", "options": ["a", "b", "c", "d"], "answer": 0}
        for _ in range(5)
    ]

    def mock_generate(api_key: str, url: str):
        assert api_key == "key"
        assert url == "http://example.com"
        return sample

    monkeypatch.setattr(quiz_generator, "generate_quiz_from_url", mock_generate)

    response = client.post("/quiz", json={"api_key": "key", "url": "http://example.com"})
    assert response.status_code == 200
    assert response.json() == {"questions": sample}
