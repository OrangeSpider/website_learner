from fastapi import APIRouter

from ..models.quiz_models import QuizRequest, QuizResponse, QuizQuestion
from ..services.quiz_generator import generate_quiz_from_url

router = APIRouter()


@router.post("/quiz", response_model=QuizResponse)
async def generate_quiz(req: QuizRequest) -> QuizResponse:
    quiz_data = generate_quiz_from_url(req.url)
    questions = [QuizQuestion(**q) for q in quiz_data]
    return QuizResponse(questions=questions)
