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
  jobPath = "/job";
  filePath = "/files";
  fileUploadPath = "/files/local";
  connectionPath = "/connection";
  restartPath = "/system/commands/core/restart";
  toolPath = "/printer/tool";
  bedPath = "/printer/bed";
  basePath = "/api";

  makeApiUrl(url, path = "") {
    return url + this.basePath + path;
  }

  createApiInstance(apiKey) {
    return ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });
  }

  updateIFramePolicy = (link, apiKey) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.settingsPath), {
        json: { server: { allowFraming: true } },
      })
      .json()
      .catch((err) => console.log("Error updating iFrame Policy", err));
  };

  restartOctoprint = (link, apiKey) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.restartPath))
      .json()
      .catch((err) => console.log("Error restarting Octoprint", err));
  };

  fetchGeneralInfo(link, apiKey) {
    const api = this.createApiInstance(apiKey);

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
    const api = this.createApiInstance(apiKey);

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

  fetchJobStatus(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    return Promise.all([api.get(this.makeApiUrl(link, this.jobPath))])
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

  fetchAllFiles(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    return Promise.all([api.get(this.makeApiUrl(link, this.filePath))])
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

  fetchConnectionInfo(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    return Promise.all([api.get(this.makeApiUrl(link, this.connectionPath))])
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

  modifyPrinterConnection = (link, apiKey, connection) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.connectionPath), {
        json: { command: connection },
      })
      .json()
      .catch((err) => console.log("Error connecting to printer", err));
  };

  sendJobCommand = (link, apiKey, command, action) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.jobPath), {
        json: { command, action },
      })
      .json()
      .catch((err) => console.log("Error sending command to printer", err));
  };

  uploadFile = (link, apiKey, file, print) => {
    const api = this.createApiInstance(apiKey);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("print", print);

    api
      .post(this.makeApiUrl(link, this.fileUploadPath), {
        body: formData,
      })
      .json()
      .catch((err) => console.log("Error uploading file", err));
  };

  startPrint = (link, apiKey, origin, path) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.filePath + "/" + origin + "/" + path), {
        json: { command: "select", print: true },
      })
      .json()
      .catch((err) => console.log("Error starting print", err));
  };

  heatNozzle = (link, apiKey, temp) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.toolPath), {
        json: { command: "target", targets: { tool0: temp } },
      })
      .json()
      .catch((err) => console.log("Error preheating nozzle", err));
  };

  heatBed = (link, apiKey, temp) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.bedPath), {
        json: { command: "target", target: temp },
      })
      .json()
      .catch((err) => console.log("Error preheating bed", err));
  };
}
export default OctoprintDataStore;
