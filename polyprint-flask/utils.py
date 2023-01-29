import json
import asyncio
import aiohttp


def read_config(path):
    f = open(path)
    data = json.load(f)
    f.close()
    return data


def save_config(path, config):
    json_object = json.dumps(config, indent=4)
    with open(path, "w") as outfile:
        outfile.write(json_object)


def flatten(lis):
    return [item for sublist in lis for item in sublist]


async def get(printer_address, session):
    response_body = {
        "name": printer_address["name"],
        "addresses": [],
        "statuses": [],
    }
    for url in printer_address["urls"]:
        try:
            async with session.get(url=url, timeout=2) as response:
                if response.status == 200:
                    # print(f"{url}: available")
                    response_body["addresses"].append(url)
                    response_body["statuses"].append(True)
                else:
                    # print(f"{url}: unavailable")
                    response_body["addresses"].append(url)
                    response_body["statuses"].append(False)
        except Exception as e:
            # print(f"{url}: unavailable")
            response_body["addresses"].append(url)
            response_body["statuses"].append(False)
    return response_body


async def gather(printer_addresses):
    async with aiohttp.ClientSession() as session:
        ret = await asyncio.gather(*[get(printer_address, session) for printer_address in printer_addresses])
    # print("Finally fetched all {} URLs and got responses.".format(len(flatten(list(map(lambda el: el['addresses'], ret))))))
    return ret
