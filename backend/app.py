from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_service import match_volunteers
from firebase_service import (
    get_all_volunteers, add_volunteer,
    get_all_needs, add_need, update_need_matches
)

app = Flask(__name__)
CORS(app)  # This allows the React frontend (on a different URL) to talk to this backend

@app.route("/volunteers", methods=["GET"])
def list_volunteers():
    return jsonify(get_all_volunteers())

@app.route("/volunteers", methods=["POST"])
def register_volunteer():
    data = request.json
    add_volunteer(data)
    return jsonify({"message": "Volunteer registered!"}), 201

@app.route("/needs", methods=["GET"])
def list_needs():
    return jsonify(get_all_needs())

@app.route("/needs", methods=["POST"])
def post_need():
    data = request.json
    need_id = add_need(data)
    # Return the ID so the frontend can immediately trigger matching on this need
    return jsonify({"message": "Need posted!", "id": need_id}), 201

@app.route("/match", methods=["POST"])
def match():
    body = request.json
    need_description = body.get("description")
    need_id = body.get("need_id")

    volunteers = get_all_volunteers()
    if not volunteers:
        return jsonify({"error": "No volunteers registered yet"}), 400

    matches = match_volunteers(need_description, volunteers)
    
    # Save matches back to Firebase so there's a record
    if need_id:
        update_need_matches(need_id, matches)

    return jsonify({"matches": matches})

if __name__ == "__main__":
    # debug=False in production, but locally True helps you see errors
    app.run(debug=True, port=5000)