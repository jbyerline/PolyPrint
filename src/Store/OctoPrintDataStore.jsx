import { makeAutoObservable } from "mobx";
import React from "react";
import ky from "ky";

class OffersChecklistDatastore {
  constructor() {
    makeAutoObservable(this);
  }

  versionPath = "/version";
  basePath = "/api";
  baseURL = "https://mk3s.byerline.me";
  apiUrl = this.baseURL + this.basePath;

  apiKey = "F709DCD954D1417B95B9D57014D05357";

  makeApiUrl(path = "") {
    return this.baseURL + this.basePath + path;
  }

  offersStats = {};
  offersData = [];

  fetchData() {
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
          // this.offersStats = data.offer_checklist_stats;
          // this.offersData = data.offer_checklist_data;
        }
      })
      .catch((err) =>
        console.log("Error retrieving Offers Checklist data", err)
      );
  }
}
export default OffersChecklistDatastore;
