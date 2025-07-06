from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import quiz, user

app = FastAPI()

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
