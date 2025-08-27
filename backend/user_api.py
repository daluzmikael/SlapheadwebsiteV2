from flask import Blueprint, jsonify, request

user_api = Blueprint('user_api', __name__)

@user_api.route('/api/register', methods=['POST'])
def register_user():
    return jsonify(request.json)

@user_api.route('/api/login', methods=['POST'])
def login_user():
    return jsonify({"message": "Logged in"})

@user_api.route('/api/profile', methods=['GET'])
def get_profile():
    return jsonify({"id": 1, "name": "John Doe", "email": "john@example.com"})

@user_api.route('/api/profile', methods=['PUT'])
def update_profile():
    return jsonify(request.json)