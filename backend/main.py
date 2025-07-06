from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .api import quiz, user

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("Incoming request: %s %s", request.method, request.url.path)
    response = await call_next(request)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Learning Quiz AI"}


app.include_router(quiz.router)
app.include_router(user.router)
