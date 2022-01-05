import React, { Component } from "react";
import { Helmet } from "react-helmet-async";

class MetaHelmet extends Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <html lang="en" />
          <title>PolyPrint</title>
          {/*<script type="module" src="https://unpkg.com/x-frame-bypass" />*/}
        </Helmet>
      </div>
    );
  }
}
export default MetaHelmet;
