from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/config', methods=['GET'])
def fetch_config():
    f = open('printerConfig.json')
    data = json.load(f)
    return json.dumps(data)


@app.route('/login', methods=['POST'])
def login():
    f = open('printerConfig.json')
    data = json.load(f)
    if data["credentials"]["username"] == request.json["username"] and data["credentials"]["password"] == request.json["password"]:
        return "Login Success", 200
    else:
        return "Login Failed", 401


if __name__ == '__main__':
    app.run()
