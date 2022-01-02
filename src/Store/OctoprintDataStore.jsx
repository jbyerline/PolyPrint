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
  basePath = "/api";

  makeApiUrl(url, path = "") {
    return url + this.basePath + path;
  }

  fetchProfileInfo = (link, apiKey) => {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", apiKey);
          },
        ],
      },
    });

    return api
      .get(this.makeApiUrl(link, this.profilePath))
      .json()
      .catch((err) =>
        console.log("Error retrieving Offers Checklist data", err)
      );
  };

  fetchGeneralInfo(link, apiKey) {
    const defaultQueryParams = {};

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
      api.get(this.makeApiUrl(link, this.versionPath), {
        defaultQueryParams,
      }),
      api.get(this.makeApiUrl(link, this.profilePath), {
        defaultQueryParams,
      }),
      api.get(this.makeApiUrl(link, this.serverPath), {
        defaultQueryParams,
      }),
      api.get(this.makeApiUrl(link, this.settingsPath), {
        defaultQueryParams,
      }),
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
}
export default OctoprintDataStore;
