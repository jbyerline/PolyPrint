import React, { Component } from "react";
import { Helmet } from "react-helmet-async";

class MetaHelmet extends Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <html lang="en" />
          <title>PolyPrint</title>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
          <meta name="apple-mobile-web-app-title" content="PolyPrint" />
          <meta name="application-name" content="PolyPrint" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          {/*<script type="module" src="https://unpkg.com/x-frame-bypass" />*/}
        </Helmet>
      </div>
    );
  }
}
export default MetaHelmet;
