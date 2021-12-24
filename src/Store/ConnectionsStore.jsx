import { makeAutoObservable } from "mobx";
import React from "react";
import ky from "ky";

class ConnectionDatastore {
  constructor() {
    makeAutoObservable(this);
  }

  loginPath = "/login";
  basePath = "/api";
  baseURL = "https://mk3s.byerline.me";
  apiUrl = this.baseURL + this.basePath;

  apiKey = "F709DCD954D1417B95B9D57014D05357";

  makeApiUrl(path = "") {
    return this.baseURL + this.basePath + path;
  }

  isLoggedIn = false;

  async login(user, pass, remember) {
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

    return api
      .post(this.makeApiUrl(this.loginPath), {
        defaultQueryParams,
        json: { user, pass, remember },
      })
      .json();
    // .then((data) => {
    //   this.isLoggedIn = true;
    //   return data;
    // })
    // .catch((err) => {
    //   console.log("Error Logging in", err);
    //   this.isLoggedIn = false;
    //   return false;
    // });
  }
}
export default ConnectionDatastore;
