from pydantic import BaseModel, Field


class QuizRequest(BaseModel):
    """Parameters to generate a quiz from a URL."""

    url: str
    num_questions: int = Field(5, ge=3, le=6)
    allow_multiple: bool = False

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    answers: list[int]
    multiple: bool


class QuizResponse(BaseModel):
    questions: list[QuizQuestion]
