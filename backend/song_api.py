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

song_api = Blueprint('song_api', __name__)

@song_api.route('/songs', methods=['GET'])
def get_songs():
    songs = get_all_songs()
    return jsonify(songs)

@song_api.route('/songs/<int:song_id>', methods=['GET'])
def get_song(song_id):
    song = get_song_by_id(song_id)
    if song:
        return jsonify(song)
    else:
        return jsonify({"error": "Song not found"}), 404

@song_api.route('/songs/<int:song_id>/save', methods=['POST'])
def save_song(song_id):
    data = request.get_json()
    user_id = data.get("user_id")

    conn = None
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute("INSERT INTO saved_songs (user_id, song_id) VALUES (?, ?)", (user_id, song_id))
        conn.commit()
        return jsonify({"message": f"song {song_id} saved for user {user_id}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@song_api.route('/songs/<int:song_id>/unsave', methods=['DELETE'])
def unsave_song(song_id):
    data = request.get_json()
    user_id = data.get("user_id")

    conn = get_connection()
    c = conn.cursor()
    c.execute("DELETE FROM saved_songs WHERE user_id = ? AND song_id = ?", (user_id, song_id))
    conn.commit()
    conn.close()

    return jsonify({"message": f"song {song_id} unsaved for user {user_id}"}), 200

@song_api.route('/songs/saved/<int:user_id>', methods=['GET'])
def get_saved_songs(user_id):
    songs = get_saved_songs_for_user(user_id)
    return jsonify(songs)

@song_api.route('/songs/search', methods=['GET'])
def search_songs_by_query_route():
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify(get_all_songs())
    results = search_songs_by_query(query)
    print(f"Query: {query}, Matches: {len(results)}")
    return jsonify(results)

