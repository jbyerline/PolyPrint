from flask import Flask, request
from flask_cors import CORS
import json
import os
import sys
import utils

# TODO: Make this dynamic? Maybe an env var?
CONFIG_PATH = "printerConfigLocal.json"
# CONFIG_PATH = "printerConfig.json"

app = Flask(__name__)
CORS(app)


@app.route('/config', methods=['GET'])
def fetch_config():
    return json.dumps(utils.read_config(CONFIG_PATH)), 200


@app.route('/login', methods=['POST'])
def login():
    data = utils.read_config(CONFIG_PATH)
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
