from flask import Flask
from flasgger import Swagger
from user_api import user_api
from pet_api import song_api
from extra_api import extra_api
from flask_cors import CORS
from questionnaire_api import questionnaire_api

app = Flask(__name__)
swagger = Swagger(app)
CORS(app, origins=["http://localhost:3000"])

app.register_blueprint(user_api, url_prefix="/api")
app.register_blueprint(pet_api, url_prefix="/api")
app.register_blueprint(extra_api, url_prefix="/api")
app.register_blueprint(questionnaire_api, url_prefix="/api")

@app.route('/')
def home():
    return 'API is running'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

