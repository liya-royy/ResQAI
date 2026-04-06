import firebase_admin
from firebase_admin import credentials, firestore

# This reads the secret key file to authenticate with Firebase
cred = credentials.Certificate("serviceAccountKey.json")
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
    # Return the auto-generated document ID so the frontend can reference this need
    return ref[1].id

def update_need_matches(need_id, matches):
    db.collection("needs").document(need_id).update({"matches": matches})