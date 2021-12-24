import { makeAutoObservable } from "mobx";
import React from "react";
import ky from "ky";

class InfoDatastore {
  constructor() {
    makeAutoObservable(this);
  }

  versionPath = "/version";
  serverPath = "/server";
  basePath = "/api";
  baseURL = "https://mk3s.byerline.me";
  apiUrl = this.baseURL + this.basePath;

  apiKey = "F709DCD954D1417B95B9D57014D05357";

  makeApiUrl(path = "") {
    return this.baseURL + this.basePath + path;
  }

  versionInfo = {};
  serverInfo = {};
  generalInfo = {};

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

    api
      .get(this.makeApiUrl(this.versionPath), {
        defaultQueryParams,
      })
      .json()
      .then((data) => {
        if (data) {
          console.log(data);
          this.versionInfo = data;
        }
      })
      .catch((err) =>
        console.log("Error retrieving Offers Checklist data", err)
      );

    api
      .get(this.makeApiUrl(this.serverPath), {
        defaultQueryParams,
      })
      .json()
      .then((data) => {
        if (data) {
          console.log(data);
          this.serverInfo = data;
        }
      })
      .catch((err) =>
        console.log("Error retrieving Offers Checklist data", err)
      );

    this.generalInfo = {
      ...this.versionInfo,
      ...this.serverInfo,
    };
  }
}
export default InfoDatastore;
