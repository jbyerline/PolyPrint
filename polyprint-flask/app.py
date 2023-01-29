from flask import Flask, request
from flask_cors import CORS
import json
import os
import sys
from apscheduler.schedulers.background import BackgroundScheduler
import asyncio
import time

import filter
import utils
import logging

# TODO: Make this dynamic? Maybe an env var?
CONFIG_PATH = "printerConfigLocal.json"


# CONFIG_PATH = "printerConfig.json"

# TODO: This logic may no longer be necessary if handled by js code
def check_for_online_printers():
    tic = time.perf_counter()
    # print("Checking for printer connectivity...")
    data = utils.read_config(CONFIG_PATH)
    printer_addresses = []
    for printer in data['printers']:
        if "privateIp" in printer and "publicUrl" in printer:
            printer_addresses.append(
                {
                    "name": printer["name"],
                    "urls": [printer["privateIp"], printer["publicUrl"]]
                }
            )
        elif "privateIp" in printer:
            printer_addresses.append(
                {
                    "name": printer["name"],
                    "urls": [printer["privateIp"]]
                }
            )
        elif "publicUrl" in printer:
            printer_addresses.append(
                {
                    "name": printer["name"],
                    "urls": [printer["publicUrl"]]
                }
            )
    results = asyncio.run(utils.gather(printer_addresses))
    for printer_status in results:
        printer = [printer for printer in data['printers'] if (printer_status['name'] in list(printer.values()))][0]
        if any(printer_status['statuses']):
            if not printer['isOnline']:
                print(printer['name'] + " is now online!")
            printer['isOnline'] = True
        else:
            if printer['isOnline']:
                print(printer['name'] + " is now offline!")
            printer['isOnline'] = False
    utils.save_config(CONFIG_PATH, data)
    toc = time.perf_counter()
    # print(f"It took {toc - tic:0.4f} seconds to check all printers")


scheduler = BackgroundScheduler(daemon=True)
scheduler.add_job(check_for_online_printers, 'interval', seconds=1)
scheduler.start()
my_filter = filter.NoRunningFilter()
logging.getLogger("apscheduler.scheduler").addFilter(my_filter)

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


@app.route('/test', methods=['GET'])
def test():
    files = os.listdir(os.curdir)  # files and directories
    print(files, file=sys.stderr)
    return "", 200


@app.route('/', methods=['GET'])
def home():
    return "API is working!", 200


if __name__ == '__main__':
    app.run()
