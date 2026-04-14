import os
import json
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True,
    project="ai-built-492513",
    location="us-central1",
)

def match_volunteers(need_description, volunteers):
    volunteer_list = "\n".join([
        f"- ID: {v['id']}, Name: {v['name']}, Skills: {v['skills']}, "
        f"District: {v['district']}, Available: {v['available']}"
        for v in volunteers
    ])

    prompt = f"""
You are an intelligent assistant helping NGO coordinators in Kerala 
respond faster to community crises. Your job is to understand what 
kind of help is being requested and find the most suitable people 
from the registered volunteer pool.

Community need posted:
"{need_description}"

Registered volunteers:
{volunteer_list}

Analyze the need carefully. Consider:
- What specific skills or physical abilities are required?
- Is location proximity critical given the urgency?
- Are there safety factors (e.g. medical need = healthcare background required)?
- Only match volunteers where available is True.

Return a JSON array of the top 5 best-matched volunteers. For each include:
- id
- name
- reason (one clear sentence explaining why they match this specific need)
- score (1-10)

Return ONLY valid JSON. No explanation, no markdown, no backticks.
"""

    response = client.models.generate_content(
        model="gemini-2.0-flash-001",
        contents=prompt,
    )
    text = response.text.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]

    matches = json.loads(text.strip())
    seen = set()
    unique_matches = []
    for match in matches:
        if match["id"] not in seen:
            seen.add(match["id"])
            unique_matches.append(match)
    return unique_matches