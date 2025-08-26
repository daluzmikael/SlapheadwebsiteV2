from flask import Blueprint, jsonify, request
from db import (
    search_songs_by_query,
    get_connection,
    get_all_songs,
    get_song_by_id,
    search_songs_by_genre,
    save_song_for_user,
    get_saved_songs_for_user
)

'''Sons API'''

pet_api = Blueprint('song_api', __name__)

@pet_api.route('/pets', methods=['GET'])
def get_pets():
    pets = get_all_pets()
    return jsonify(pets)

@pet_api.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = get_pet_by_id(pet_id)
    if pet:
        return jsonify(pet)
    else:
        return jsonify({"error": "Pet not found"}), 404

@pet_api.route('/pets/<int:pet_id>/save', methods=['POST'])
def save_pet(pet_id):
    data = request.get_json()
    user_id = data.get("user_id")

    conn = None
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute("INSERT INTO saved_pets (user_id, pet_id) VALUES (?, ?)", (user_id, pet_id))
        conn.commit()
        return jsonify({"message": f"Pet {pet_id} saved for user {user_id}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@pet_api.route('/pets/<int:pet_id>/unsave', methods=['DELETE'])
def unsave_pet(pet_id):
    data = request.get_json()
    user_id = data.get("user_id")

    conn = get_connection()
    c = conn.cursor()
    c.execute("DELETE FROM saved_pets WHERE user_id = ? AND pet_id = ?", (user_id, pet_id))
    conn.commit()
    conn.close()

    return jsonify({"message": f"Pet {pet_id} unsaved for user {user_id}"}), 200

@pet_api.route('/pets/saved/<int:user_id>', methods=['GET'])
def get_saved_pets(user_id):
    pets = get_saved_pets_for_user(user_id)
    return jsonify(pets)

@pet_api.route('/pets/search', methods=['GET'])
def search_pets_by_query_route():
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify(get_all_pets())
    results = search_pets_by_query(query)
    print(f"Query: {query}, Matches: {len(results)}")
    return jsonify(results)

