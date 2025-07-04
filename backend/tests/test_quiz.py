from fastapi.testclient import TestClient

from ..main import app
from ..services import quiz_generator


client = TestClient(app)


def test_generate_quiz_endpoint(monkeypatch):
    sample = [
        {"question": "q1", "options": ["a", "b", "c", "d"], "answer": 0}
        for _ in range(5)
    ]

    monkeypatch.setenv("OPENAI_API_KEY", "key")

    def mock_generate(url: str, api_key: str | None = None):
        assert url == "http://example.com"
        return sample

    monkeypatch.setattr(quiz_generator, "generate_quiz_from_url", mock_generate)

    response = client.post("/quiz", json={"url": "http://example.com"})
    assert response.status_code == 200
    assert response.json() == {"questions": sample}
