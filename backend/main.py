from fastapi import FastAPI

from .api import quiz

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to Learning Quiz AI"}


app.include_router(quiz.router)
