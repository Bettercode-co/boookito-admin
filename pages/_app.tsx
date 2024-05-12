import "../styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Router from "next/router";
import PageChange from "../components/PageChange/PageChange";
import { AppProps } from "../interfaces";
import { AppWrapper } from "../components/context/AppContext";
import "react-toastify/dist/ReactToastify.css";

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(<PageChange />, document.getElementById("page-transition"));
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
        <title>پنل مدیریت بوکیتو</title>
      </Head>

      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </React.Fragment>
  );
};

export default MyApp;
