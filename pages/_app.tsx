import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";

// types
import type { AppProps } from "next/app";

// global styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "rc-slider/assets/index.css";
import "../assets/css/styles.scss";

import * as gtag from "./../utils/gtag";
import { SessionProvider } from "next-auth/react";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  </SessionProvider>
);

export default wrapper.withRedux(MyApp);
