from flask import Blueprint, jsonify, request
from auth_helpers import require_user_id, require_user_id_param
from db import (
    search_songs_by_query,
    get_connection,
    get_all_songs,
    get_song_by_id,
    get_saved_songs_for_user,
)

song_api = Blueprint('song_api', __name__)

def song_as_pet(song):
    return {
        "id": song["id"],
        "name": song["title"],
        "species": song["artist"],
        "breed": song["genre"],
        "age": song["plays"] % 10 + 1,
        "allergen": song["length"],
        "temperament": song["unlocked"],
        "image": song.get("image", "/placeholder.jpg"),
    }

@song_api.route('/songs', methods=['GET'])
def get_songs():
    return jsonify(get_all_songs())

@song_api.route('/songs/<int:song_id>', methods=['GET'])
def get_song(song_id):
    song = get_song_by_id(song_id)
    if song:
        return jsonify(song)
    return jsonify({"error": "Song not found"}), 404

@song_api.route('/songs/<int:song_id>/save', methods=['POST'])
def save_song(song_id):
    user_id, error = require_user_id(request.get_json())
    if error:
        return error

    if not get_song_by_id(song_id):
        return jsonify({"error": "Song not found"}), 404

    conn = None
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute(
            "SELECT 1 FROM unlocked_songs WHERE user_id = ? AND song_id = ?",
            (user_id, song_id),
        )
        if c.fetchone():
            return jsonify({"message": "Song already saved"}), 200
        c.execute(
            "INSERT INTO unlocked_songs (user_id, song_id) VALUES (?, ?)",
            (user_id, song_id),
        )
        conn.commit()
        return jsonify({"message": f"Saved {get_song_by_id(song_id)['title']}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@song_api.route('/songs/<int:song_id>/unsave', methods=['DELETE'])
def unsave_song(song_id):
    user_id, error = require_user_id(request.get_json())
    if error:
        return error

    conn = get_connection()
    c = conn.cursor()
    c.execute(
        "DELETE FROM unlocked_songs WHERE user_id = ? AND song_id = ?",
        (user_id, song_id),
    )
    deleted = c.rowcount
    conn.commit()
    conn.close()

    if deleted == 0:
        return jsonify({"error": "Saved song not found"}), 404
    return jsonify({"message": "Song removed from your library"}), 200

@song_api.route('/songs/saved/<int:user_id>', methods=['GET'])
def get_saved_songs(user_id):
    user_id, error = require_user_id_param(user_id)
    if error:
        return error
    return jsonify(get_saved_songs_for_user(user_id))

@song_api.route('/songs/search', methods=['GET'])
def search_songs_by_query_route():
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify(get_all_songs())
    return jsonify(search_songs_by_query(query))

@song_api.route('/pets', methods=['GET'])
def get_pets():
    return jsonify([song_as_pet(song) for song in get_all_songs()])

@song_api.route('/pets/search', methods=['GET'])
def search_pets():
    query = request.args.get('query', '').strip()
    songs = search_songs_by_query(query) if query else get_all_songs()
    return jsonify([song_as_pet(song) for song in songs])

@song_api.route('/pets/saved/<int:user_id>', methods=['GET'])
def get_saved_pets(user_id):
    user_id, error = require_user_id_param(user_id)
    if error:
        return error
    return jsonify([song_as_pet(song) for song in get_saved_songs_for_user(user_id)])

@song_api.route('/pets/<int:pet_id>/unsave', methods=['DELETE'])
def unsave_pet(pet_id):
    return unsave_song(pet_id)
