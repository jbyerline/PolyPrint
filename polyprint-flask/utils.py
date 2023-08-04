import json


def read_config(path):
    f = open(path)
    data = json.load(f)
    f.close()
    return data


def save_config(path, config):
    json_object = json.dumps(config, indent=4)
    with open(path, "w") as outfile:
        outfile.write(json_object)