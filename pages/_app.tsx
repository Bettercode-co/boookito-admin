import "../styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Router from "next/router";
import PageChange from "../components/PageChange/PageChange";
// import "@fontawesome/fontawesome-free/css/all.min.css";
import { AppProps } from "../interfaces";
import Script from "next/script";
import { AppWrapper } from "../components/context/AppContext";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange  />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Notus NextJS by Creative Tim</title>
      </Head>
      <Script
        defer
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
      ></Script>
      <AppWrapper>
      <Layout >
        <Component {...pageProps} />
      </Layout>
      </AppWrapper>
    </React.Fragment>
  );
};

export default MyApp;
