import sqlite3

DB_NAME = 'database.db'

def get_connection():
    return sqlite3.connect(DB_NAME)

def get_all_users():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, username, email FROM users")
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "username": row[1], "email": row[2]} for row in rows]

def get_user_by_email(email):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, username, email, password FROM users WHERE email = ?", (email,))
    row = c.fetchone()
    conn.close()
    if row:
        return {"id": row[0], "username": row[1], "email": row[2], "password": row[3]}
    return None

def create_user(username, email, password):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, password))
        conn.commit()
        return {"message": "User created", "username": username, "email": email}
    except sqlite3.IntegrityError:
        return {"error": "Email or username already exists"}
    finally:
        conn.close()

def update_user_profile(user_id, username, email):
    conn = get_connection()
    c = conn.cursor()
    c.execute("UPDATE users SET username = ?, email = ? WHERE id = ?", (username, email, user_id))
    conn.commit()
    conn.close()

def get_all_songs():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, title, artist, length, plays, unlocked, genre FROM songs")
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "artist": row[2], "length": row[3], "plays": row[4], "unlocked": row[5], "genre": row[6]} for row in rows]

def get_song_by_id(song_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, title, artist, length, plays, unlocked, genre FROM songs WHERE id = ?", (song_id,))
    row = c.fetchone()
    conn.close()
    return {"id": row[0], "title": row[1], "artist": row[2], "length": row[3], "plays": row[4], "unlocked": row[5], "genre": row[6]} if row else None

def search_songs_by_genre(genre):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, title, artist, length, plays, unlocked, genre FROM songs WHERE genre LIKE ?", (f"%{genre}%",))
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "artist": row[2], "length": row[3], "plays": row[4], "unlocked": row[5], "genre": row[6]} for row in rows]

def save_song_for_user(user_id, song_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT OR IGNORE INTO unlocked_songs (user_id, song_id) VALUES (?, ?)", (user_id, song_id))
    conn.commit()
    conn.close()

def get_saved_songs_for_user(user_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
        SELECT songs.id, songs.title, songs.artist, songs.length, songs.plays, songs.unlocked, songs.genre
        FROM songs
        JOIN unlocked_songs ON songs.id = unlocked_songs.song_id
        WHERE unlocked_songs.user_id = ?
    """, (user_id,))
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "artist": row[2], "length": row[3], "plays": row[4], "unlocked": row[5], "genre": row[6]} for row in rows]

def save_rsvp_for_user(user_id, event_id):
    """Save a user RSVP for an event if not already saved."""
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT 1 FROM rsvped_events WHERE user_id = ? AND event_id = ?", (user_id, event_id))
    exists = c.fetchone()
    if not exists:
        c.execute("INSERT INTO rsvped_events (user_id, event_id) VALUES (?, ?)", (user_id, event_id))
        conn.commit()
    conn.close()

def get_rsvped_events_for_user(user_id):
    """Return a list of events the user has RSVPed to."""
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
        SELECT events.id, events.name, events.date
        FROM events
        JOIN rsvped_events ON events.id = rsvped_events.event_id
        WHERE rsvped_events.user_id = ?
    """, (user_id,))
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "name": row[1], "date": row[2]} for row in rows]

def has_user_rsvped(user_id, event_id):
    """Check if a user has already RSVPed for a given event."""
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT 1 FROM rsvped_events WHERE user_id = ? AND event_id = ?", (user_id, event_id))
    exists = c.fetchone()
    conn.close()
    return exists is not None

def search_songs_by_query(query):
    conn = get_connection()
    c = conn.cursor()
    q = f"%{query.lower()}%"
    c.execute("""
        SELECT id, title, artist, length, plays, unlocked, genre
        FROM songs
        WHERE LOWER(title) LIKE ?
           OR LOWER(artist) LIKE ?
           OR LOWER(length) LIKE ?
           OR LOWER(genre) LIKE ?
    """, (q, q, q, q))
    rows = c.fetchall()
    conn.close()
    return [
        {
            "id": row[0], "title": row[1], "artist": row[2],
            "length": row[3], "plays": row[4],
            "unlocked": row[5], "genre": row[6]
        }
        for row in rows
    ]


    return [{
        "id": row[0],
        "name": row[1],
        "species": row[2],
        "breed": row[3],
        "age": row[4],
        "allergen": row[5],
        "temperament": row[6]
    } for row in rows]

def get_questionnaire_responses():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT user_id, question, answer FROM questionnaire_responses")
    rows = c.fetchall()
    conn.close()
    return [{"user_id": row[0], "question": row[1], "answer": row[2]} for row in rows]



