import { makeAutoObservable } from "mobx";
import ky from "ky";

class OctoprintDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  versionPath = "/version";
  serverPath = "/server";
  profilePath = "/printerprofiles";
  settingsPath = "/settings";
  printerStatePath = "/printer";
  restartPath = "/system/commands/core/restart";
  basePath = "/api";

  makeApiUrl(url, path = "") {
    return url + this.basePath + path;
  }

  updateIFramePolicy = (link, apiKey) => {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });

    api
      .post(this.makeApiUrl(link, this.settingsPath), {
        json: { server: { allowFraming: true } },
      })
      .json()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Error updating iFrame Policy", err));
  };

  restartOctoprint = (link, apiKey) => {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });

    api
      .post(this.makeApiUrl(link, this.restartPath))
      .json()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Error restarting Octoprint", err));
  };

  fetchGeneralInfo(link, apiKey) {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });

    return Promise.all([
      api.get(this.makeApiUrl(link, this.versionPath)),
      api.get(this.makeApiUrl(link, this.profilePath)),
      api.get(this.makeApiUrl(link, this.serverPath)),
      api.get(this.makeApiUrl(link, this.settingsPath)),
    ])
      .then((responses) => {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .catch((error) => {
        // if there's an error, log it
        console.log(error);
      });
  }

  fetchPrinterStatus(link, apiKey) {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });

    return Promise.all([api.get(this.makeApiUrl(link, this.printerStatePath))])
      .then((responses) => {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .catch((error) => {
        // if there's an error, log it
        console.log(error);
      });
  }
}
export default OctoprintDataStore;
