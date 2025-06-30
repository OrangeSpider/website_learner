"""Utilities to create quizzes from web content using OpenAI."""

from __future__ import annotations

import json
from typing import Any

import openai
import requests
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
    resp = requests.get(url)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    return soup.get_text(separator=" ", strip=True)


def generate_quiz_from_url(api_key: str, url: str) -> list[dict[str, Any]]:
    """Fetch the page and ask OpenAI to create quiz questions."""

    text = _fetch_page_text(url)

    openai.api_key = api_key
    messages = [
        {"role": "system", "content": "You generate quizzes from website content."},
        {"role": "user", "content": f"{PROMPT}\nContent:\n{text}"},
    ]

    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    content = completion.choices[0].message.content
    return json.loads(content)

