from flask import Flask, send_from_directory
from flasgger import Swagger
from user_api import user_api
from song_api import song_api
from events_api import events_api
from flask_cors import CORS
from questionnaire_api import questionnaire_api
import os

app = Flask(__name__)
swagger = Swagger(app)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

SONGS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'songs'))

app.register_blueprint(user_api, url_prefix="/api")
app.register_blueprint(song_api, url_prefix="/api")
app.register_blueprint(events_api, url_prefix="/api")
app.register_blueprint(questionnaire_api, url_prefix="/api")

@app.route('/media/<path:filename>')
def serve_media(filename):
    direct = os.path.join(SONGS_DIR, filename)
    if os.path.isfile(direct):
        return send_from_directory(SONGS_DIR, filename)
    assets = os.path.join(SONGS_DIR, 'assets', filename)
    if os.path.isfile(assets):
        return send_from_directory(os.path.join(SONGS_DIR, 'assets'), filename)
    return 'Audio file not found', 404
@app.route('/')
def home():
    return 'API is running'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

