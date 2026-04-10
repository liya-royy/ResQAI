import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
from google.cloud import secretmanager

def get_secret():
    client = secretmanager.SecretManagerServiceClient()
    name = "projects/ai-built-492513/secrets/serviceAccountKey/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return json.loads(response.payload.data.decode("UTF-8"))

if not firebase_admin._apps:
    secret = get_secret()
    cred = credentials.Certificate(secret)
    firebase_admin.initialize_app(cred)

db = firestore.client()

def get_all_volunteers():
    docs = db.collection("volunteers").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

def add_volunteer(data):
    db.collection("volunteers").add(data)

def get_all_needs():
    docs = db.collection("needs").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

def add_need(data):
    ref = db.collection("needs").add(data)
    return ref[1].id

def update_need_matches(need_id, matches):
    db.collection("needs").document(need_id).update({"matches": matches})