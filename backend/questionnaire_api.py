from flask import Blueprint, jsonify, request
from db import get_connection, get_questionnaire_responses
questionnaire_api = Blueprint('questionnaire_api', __name__)

@questionnaire_api.route('/questionnaire/submit', methods=['POST'])
def submit_questionnaire():
    data = request.get_json()
    user_id = data.get("user_id")
    responses = data.get("responses") or data.get("answers")

    if not user_id or not isinstance(responses, (dict, list)):
        return jsonify({"error": "Invalid request"}), 400

    if isinstance(responses, dict):
        formatted = [(user_id, f"Q{idx}", answer) for idx, answer in responses.items()]
    else:
        formatted = [(user_id, r["question"], r["answer"]) for r in responses]

    conn = get_connection()
    c = conn.cursor()
    c.executemany(
        "INSERT INTO questionnaire_responses (user_id, question, answer) VALUES (?, ?, ?)",
        formatted
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Questionnaire submitted"})

@questionnaire_api.route('/questionnaire/all', methods=['GET'])
def get_all_responses():
    try:
        responses = get_questionnaire_responses()
        return jsonify(responses)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
