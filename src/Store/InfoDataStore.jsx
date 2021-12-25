import { makeAutoObservable } from "mobx";
import ky from "ky";

class InfoDatastore {
  constructor() {
    makeAutoObservable(this);
  }

  versionPath = "/version";
  serverPath = "/server";
  profilePath = "/printerprofiles";
  basePath = "/api";
  baseURL = "https://mk3s.byerline.me";
  apiUrl = this.baseURL + this.basePath;

  apiKey = "F709DCD954D1417B95B9D57014D05357";

  generalInfo = {};

  makeApiUrl(path = "") {
    return this.baseURL + this.basePath + path;
  }

  async fetchGeneralInfo() {
    const defaultQueryParams = {};

    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("X-Api-Key", this.apiKey);
          },
        ],
      },
    });

    return Promise.all([
      api.get(this.makeApiUrl(this.versionPath), {
        defaultQueryParams,
      }),
      api.get(this.makeApiUrl(this.profilePath), {
        defaultQueryParams,
      }),
      api.get(this.makeApiUrl(this.serverPath), {
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
      .then((data) => {
        // Flatten data and assign to class variable
        this.generalInfo = Object.assign(...data);
        return Object.assign(...data);
      })
      .catch((error) => {
        // if there's an error, log it
        console.log(error);
      });
  }
}
export default InfoDatastore;
