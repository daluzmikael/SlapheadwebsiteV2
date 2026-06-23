from flask import Blueprint, jsonify, request
from db import create_user, get_user_by_email

user_api = Blueprint('user_api', __name__)

@user_api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json() or {}
    result = create_user(data.get('name'), data.get('email'), data.get('password'))
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 201

@user_api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json() or {}
    user = get_user_by_email(data.get('email'))
    if user and user['password'] == data.get('password'):
        return jsonify({
            "user": {
                "id": user['id'],
                "email": user['email'],
                "username": user['username'],
            }
        })
    return jsonify({"error": "Invalid credentials"}), 401

@user_api.route('/profile', methods=['GET'])
def get_profile():
    return jsonify({"id": 1, "name": "John Doe", "email": "john@example.com"})

@user_api.route('/profile', methods=['PUT'])
def update_profile():
    return jsonify(request.json)
