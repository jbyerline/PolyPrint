import { makeAutoObservable, configure } from "mobx";
import ky from "ky";


configure({
  enforceActions: "never",
})
class OctoprintDataStore {
  constructor(name) {
    this.name = name
    makeAutoObservable(this);
  }
  name
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
  systemPath = "/system/commands/core";
  commandPath = "/printer/command";
  lightPath = "/plugin/octolight";
  timelapsePath = "/timelapse";
  basePath = "/api";

  versionInfo = {};
  generalInfo = {};
  printerStatus = {};
  jobStatus = {};
  gcodeFiles = {};
  connectionInfo = {};
  timelapseFiles = {};

  downloadTextBlob(data, downloadFileName) {
    if (data) {
      const a = window.document.createElement("a");
      const objectURL = URL.createObjectURL(data, {
        type: "text/plain",
      });
      a.setAttribute("href", objectURL);
      a.setAttribute("download", downloadFileName);

      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(objectURL);
    }
  }

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

  fetchVersionInfo(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    let respArr = [];

    return Promise.allSettled([
      api.get(this.makeApiUrl(link, this.versionPath), {retry:0}).json(),
    ])
        .then((responses) => {
          responses.forEach((response) => {
            respArr.push(response.value);
          });
          if (!respArr.includes(undefined)) {
            this.versionInfo = Object.assign(...respArr);
          } else {
            this.versionInfo = {}
          }
        })
        .catch((error) => {
          // if there's an error, log it
          console.log(error);
        });
  }

  fetchGeneralInfo(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    let respArr = [];

    Promise.allSettled([
      api.get(this.makeApiUrl(link, this.profilePath)).json(),
      api.get(this.makeApiUrl(link, this.serverPath)).json(),
      api.get(this.makeApiUrl(link, this.settingsPath)).json(),
    ])
      .then((responses) => {
        responses.forEach((response) => {
          respArr.push(response.value);
        });
        if (!respArr.includes(undefined)) {
          this.generalInfo = Object.assign(...respArr);
        } else {
          this.generalInfo = {}
        }
      })
      .catch((error) => {
        // if there's an error, log it
        console.log(error);
      });
  }

  fetchPrinterStatus(link, apiKey) {
    const api = this.createApiInstance(apiKey);
    api
      .get(this.makeApiUrl(link, this.printerStatePath))
      .json()
      .then((response) => {
        this.printerStatus = response;
      })
      .catch((error) => {
        this.printerStatus = {}
        console.log(error);
      });
  }

  fetchJobStatus(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    api
      .get(this.makeApiUrl(link, this.jobPath))
      .json()
      .then((response) => {
        this.jobStatus = response;
      })
      .catch((error) => {
        this.jobStatus = {}
        console.log(error);
      });
  }

  fetchAllFiles(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    api
      .get(this.makeApiUrl(link, this.filePath))
      .json()
      .then((response) => {
        this.gcodeFiles = response;
      })
      .catch((error) => {
        this.gcodeFiles = {}
        console.log(error);
      });
  }

  fetchConnectionInfo(link, apiKey) {
    const api = this.createApiInstance(apiKey);

    api
      .get(this.makeApiUrl(link, this.connectionPath))
      .json()
      .then((response) => {
        this.connectionInfo = response;
      })
      .catch((error) => {
        this.connectionInfo = {}
        console.log(error);
      });
  }

  modifyPrinterConnection = (link, apiKey, connection) => {
    const api = this.createApiInstance(apiKey);
    return api
      .post(this.makeApiUrl(link, this.connectionPath), {
        json: { command: connection },
      })
      .json();
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

  controlSystem = (link, apiKey, command) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.systemPath + "/" + command))
      .json()
      .catch((err) => console.log("Error preheating bed", err));
  };

  sendGcode = (link, apiKey, commands) => {
    const api = this.createApiInstance(apiKey);

    api
      .post(this.makeApiUrl(link, this.commandPath), {
        json: { commands },
      })
      .json()
      .catch((err) => console.log("Error sending GCODE command", err));
  };

  // TODO: Fetch initial state of octoLight on start up
  //  - https://github.com/gigibu5/OctoLight
  //  - action=getState
  octolight = (link, apiKey, command) => {
    const api = this.createApiInstance(apiKey);

    return api
      .get(this.makeApiUrl(link, this.lightPath + "?action=" + command))
      .json()
      .catch((err) => console.log("Error sending light command", err));
  };

  fetchTimelapses = (link, apiKey) => {
    const api = this.createApiInstance(apiKey);

    api
      .get(this.makeApiUrl(link, this.timelapsePath))
      .json()
      .then((response) => (this.timelapseFiles = response))
      .catch((err) => console.log("Error getting timelapse data", err));
  };

  downloadTimelapse = (link, apiKey, path, name) => {
    const api = this.createApiInstance(apiKey);

    return api
      .get(link + path)
      .blob()
      .then((data) => {
        this.downloadTextBlob(data, name);
      })
      .catch((err) => console.log("Error getting timelapse data", err));
  };
}
export default OctoprintDataStore;
