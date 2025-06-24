from pydantic import BaseModel

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    answer: int
