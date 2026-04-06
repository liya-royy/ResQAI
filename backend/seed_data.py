import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# 10 volunteers across different Kerala districts with varied skills
# This gives Gemini enough variety to show intelligent matching in the demo
volunteers = [
    {"name": "Arun Kumar",     "skills": "swimming, boat operation, first aid",       "district": "Alappuzha",        "available": True,  "phone": "9876543210"},
    {"name": "Meera Nair",     "skills": "nursing, first aid, elder care",             "district": "Ernakulam",        "available": True,  "phone": "9876543211"},
    {"name": "Vishnu Das",     "skills": "cooking, food distribution, logistics",      "district": "Thrissur",         "available": True,  "phone": "9876543212"},
    {"name": "Anjali Raj",     "skills": "teaching, tutoring, child care",            "district": "Kozhikode",        "available": True,  "phone": "9876543213"},
    {"name": "Sanjay Pillai",  "skills": "driving, heavy lifting, construction",       "district": "Alappuzha",        "available": True,  "phone": "9876543214"},
    {"name": "Divya Menon",    "skills": "blood donation, first aid, nursing",         "district": "Kottayam",         "available": True,  "phone": "9876543215"},
    {"name": "Rahul Varma",    "skills": "swimming, rescue operations, first aid",     "district": "Alappuzha",        "available": True,  "phone": "9876543216"},
    {"name": "Priya Suresh",   "skills": "cooking, nutrition, elder care",             "district": "Palakkad",         "available": False, "phone": "9876543217"},
    {"name": "Arjun Krishnan", "skills": "electrical work, construction, logistics",   "district": "Thrissur",         "available": True,  "phone": "9876543218"},
    {"name": "Lakshmi Gopan",  "skills": "counselling, child care, teaching",          "district": "Ernakulam",        "available": True,  "phone": "9876543219"},
]

for v in volunteers:
    db.collection("volunteers").add(v)
    print(f"Added {v['name']}")

print("Seed complete! Check Firebase console to verify.")