import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

def match_volunteers(need_description, volunteers):
    # Build a readable list of volunteers for the prompt
    volunteer_list = "\n".join([
        f"- ID: {v['id']}, Name: {v['name']}, Skills: {v['skills']}, "
        f"District: {v['district']}, Available: {v['available']}"
        for v in volunteers
    ])

    # This prompt frames Gemini as a decision-making assistant, not just a filter
    # The three analysis bullets are what make the matching genuinely intelligent
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

    response = model.generate_content(prompt)
    text = response.text.strip()
    
    # Clean up if model accidentally wraps in markdown code fences
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    
    return json.loads(text.strip())