from flask import jsonify
from db import get_user_by_id

def require_user_id(data):
    user_id = (data or {}).get("user_id")
    if user_id is None or user_id == "":
        return None, (jsonify({"error": "Login required"}), 401)
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        return None, (jsonify({"error": "Invalid user_id"}), 400)
    if not get_user_by_id(user_id):
        return None, (jsonify({"error": "User not found"}), 403)
    return user_id, None

def require_user_id_param(user_id):
    if user_id is None:
        return None, (jsonify({"error": "user_id required"}), 400)
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        return None, (jsonify({"error": "Invalid user_id"}), 400)
    if not get_user_by_id(user_id):
        return None, (jsonify({"error": "User not found"}), 403)
    return user_id, None
