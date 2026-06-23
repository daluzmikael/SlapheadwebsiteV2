from flask import Blueprint, jsonify, request
from auth_helpers import require_user_id, require_user_id_param
from db import (
    get_connection,
    get_rsvped_events_for_user,
    has_user_rsvped,
)

events_api = Blueprint('events_api', __name__)

def get_event_by_id(event_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, name, date FROM events WHERE id = ?", (event_id,))
    row = c.fetchone()
    conn.close()
    if row:
        return {"id": row[0], "name": row[1], "date": row[2]}
    return None

@events_api.route('/events', methods=['GET'])
def get_events():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT id, name, date FROM events")
    rows = c.fetchall()
    conn.close()
    return jsonify([{"id": row[0], "name": row[1], "date": row[2]} for row in rows])

@events_api.route('/events/<int:event_id>/rsvp', methods=['POST'])
def rsvp_event(event_id):
    user_id, error = require_user_id(request.get_json())
    if error:
        return error

    event = get_event_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    if has_user_rsvped(user_id, event_id):
        return jsonify({"message": f"Already RSVPed to {event['name']}"}), 200

    conn = get_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO rsvped_events (user_id, event_id) VALUES (?, ?)",
        (user_id, event_id),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": f"RSVP confirmed for {event['name']}"}), 200

@events_api.route('/events/<int:event_id>/rsvp', methods=['DELETE'])
def unrsvp_event(event_id):
    user_id, error = require_user_id(request.get_json())
    if error:
        return error

    conn = get_connection()
    c = conn.cursor()
    c.execute(
        "DELETE FROM rsvped_events WHERE user_id = ? AND event_id = ?",
        (user_id, event_id),
    )
    deleted = c.rowcount
    conn.commit()
    conn.close()

    if deleted == 0:
        return jsonify({"error": "RSVP not found"}), 404
    return jsonify({"message": "RSVP removed"}), 200

@events_api.route('/events/rsvped/<int:user_id>', methods=['GET'])
def get_rsvped_events(user_id):
    user_id, error = require_user_id_param(user_id)
    if error:
        return error
    return jsonify(get_rsvped_events_for_user(user_id))
