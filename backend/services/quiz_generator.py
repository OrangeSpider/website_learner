"""Utilities to create quizzes from web content using OpenAI."""

from __future__ import annotations

import json
import os
from typing import Any

from openai import OpenAI
import httpx
from bs4 import BeautifulSoup


PROMPT = (
    "You are a helpful assistant that creates multiple choice quizzes from "
    "website content. Use the provided text to generate exactly five questions "
    "with four answer options each. Return the result strictly as JSON in the "
    "following format: \n"
    "[{'question': '...', 'options': ['A', 'B', 'C', 'D'], 'answer': 0}]"
    " where 'answer' is the index of the correct option."
)


def _fetch_page_text(url: str) -> str:
    """Return plain text content for the given URL."""
    resp = httpx.get(url)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    return soup.get_text(separator=" ", strip=True)


def generate_quiz_from_url(
    url: str, num_questions: int = 5, allow_multiple: bool = False
) -> list[dict[str, Any]]:
    """Generate a quiz using OpenAI from the given URL."""

    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    text_content = _fetch_page_text(url)
    
    chat_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You generate multiple-choice quizzes from website content.",
            },
            {
                "role": "user",
                "content": (
                    "You are a helpful assistant that creates multiple choice quizzes from website content. "
                    f"Use the provided text to generate exactly {num_questions} questions with four answer options each. "
                    "If the allow-multiple flag is true you may include questions with several correct answers. "
                    "Return strictly JSON in the following format: "
                    "[{'question': '...', 'options': ['A', 'B', 'C', 'D'], 'answers': [0, 2], 'multiple': true}] "
                    "where 'multiple' indicates if more than one option is correct. "
                    "Please respond in German!\n\n"
                    f"allow-multiple: {allow_multiple}\n"
                    f"Here is the website text: {text_content[:4000]}\n\n"
                ),
            },
        ],
        temperature=0.7,
    )
    content = chat_response.choices[0].message.content
    content = content.replace("```json","")
    content = content.replace("```","")

    print("-----------")
    print(content)
    print("-----------")
    return json.loads(content)
    

def generate_quiz_from_url2(url: str) -> list[dict[str, Any]]:
    """Fetch the page and ask OpenAI to create quiz questions."""

    text = _fetch_page_text(url)

    openai.api_key = os.environ.get("OPENAI_API_KEY")
    messages = [
        {"role": "system", "content": "You generate quizzes from website content."},
        {"role": "user", "content": f"{PROMPT}\nContent:\n{text}"},
    ]

    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    content = completion.choices[0].message.content
    return json.loads(content)

