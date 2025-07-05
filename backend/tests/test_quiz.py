from fastapi.testclient import TestClient

from ..main import app
from ..services import quiz_generator


client = TestClient(app)


def test_generate_quiz_endpoint(monkeypatch):
    sample = [
        {
            "question": "q1",
            "options": ["a", "b", "c", "d"],
            "answers": [0],
            "multiple": False,
        }
        for _ in range(5)
    ]

    monkeypatch.setenv("OPENAI_API_KEY", "key")

    def mock_generate(url: str, num_questions: int = 5, allow_multiple: bool = False):
        assert url == "http://example.com"
        assert num_questions == 5
        assert allow_multiple is False
        return sample

    monkeypatch.setattr(quiz_generator, "generate_quiz_from_url", mock_generate)

    response = client.post("/quiz", json={"url": "http://example.com"})
    assert response.status_code == 200
    assert response.json() == {"questions": sample}
