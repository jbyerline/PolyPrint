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

  fetchGeneralInfo() {
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

    // Promise.all([
    //   api.get(this.makeApiUrl(this.versionPath), {
    //     defaultQueryParams,
    //   }),
    //   api.get(this.makeApiUrl(this.profilePath), {
    //     defaultQueryParams,
    //   }),
    //   api.get(this.makeApiUrl(this.serverPath), {
    //     defaultQueryParams,
    //   }),
    // ])
    //   .then((responses) => {
    //     // Get a JSON object from each of the responses
    //     return Promise.all(
    //       responses.map(function (response) {
    //         return response.json();
    //       })
    //     );
    //   })
    //   .then((data) => {
    //     // Flatten data and assign to class variable
    //     console.log(Object.assign(...data));
    //     this.generalInfo = Object.assign(...data);
    //     //return Object.assign(...data);
    //   })
    //   .catch((error) => {
    //     // if there's an error, log it
    //     console.log(error);
    //   });

    api
      .get(this.makeApiUrl(this.profilePath), {
        defaultQueryParams,
      })
      .json()
      .then((data) => {
        if (data) {
          this.generalInfo = data;
        }
      })
      .catch((err) => console.log("Error retrieving data", err));
  }
}
export default InfoDatastore;
