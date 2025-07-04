from pydantic import BaseModel


class QuizRequest(BaseModel):
    """Parameters to generate a quiz from a URL."""

    url: str

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    answer: int


class QuizResponse(BaseModel):
    questions: list[QuizQuestion]
