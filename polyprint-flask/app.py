from flask import Flask, request
from flask_cors import CORS
import json
import os
import sys


app = Flask(__name__)
CORS(app)
# TODO: Idk if we need this code, port 5000 may have something running on my mac which causes issues?
# cors = CORS(app, resource={
#     r"/*": {
#         "origins": "*"
#     }
# })

# TODO: Make this dynamic? Maybe an env var?
CONFIG_PATH = "printerConfigLocal.json"

@app.route('/config', methods=['GET'])
def fetch_config():
    f = open(CONFIG_PATH)
    data = json.load(f)
    return json.dumps(data), 200


@app.route('/login', methods=['POST'])
def login():
    f = open(CONFIG_PATH)
    data = json.load(f)
    if data["credentials"]["username"] == request.json["username"] and data["credentials"]["password"] == request.json[
        "password"]:
        return "Login Success", 200
    else:
        return "Login Failed", 401


@app.route('/test', methods=['GET'])
def test():
    files = os.listdir(os.curdir)  #files and directories
    print(files, file=sys.stderr)
    return "", 200


if __name__ == '__main__':
    app.run()
