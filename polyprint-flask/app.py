from flask import Flask, request
from flask_cors import CORS
import json
import utils

DEFAULT_CONFIG_PATH = "defaultConfig.json"
USER_CONFIG_PATH = "printerConfig.json"
# USER_CONFIG_PATH = "printerConfigLocal.json"

app = Flask(__name__)
CORS(app)


@app.route('/config', methods=['GET'])
def fetch_config():
    return json.dumps(utils.read_config(USER_CONFIG_PATH)), 200


@app.route('/restore', methods=['POST'])
def restore_config():
    utils.save_config(USER_CONFIG_PATH, request.json)
    return "Success", 200


@app.route('/reset', methods=['GET'])
def reset_config():
    default_json = utils.read_config(DEFAULT_CONFIG_PATH)
    utils.save_config(USER_CONFIG_PATH, default_json)
    return "Success", 200


@app.route('/login', methods=['POST'])
def login():
    data = utils.read_config(USER_CONFIG_PATH)
    if data["credentials"]["username"] == request.json["username"] and data["credentials"]["password"] == request.json[
        "password"]:
        return "Login Success", 200
    else:
        return "Login Failed", 401


@app.route('/', methods=['GET'])
def home():
    return "API is working!", 200


if __name__ == '__main__':
    app.run()
