import React from "react";
import { Layout } from "antd";
import Audit from "./Audit";
import CustomerFeatures from "./CustomerFeatures";
import Report from "./Report";
import ManageFeatures from "./ManageFeatures";
import ManagePackages from "./ManagePackages";

import { TopBar, SideBar } from "@components/Navigation";

import * as styles from "./index.module.less";
import { Provider } from "react-redux";
import store from "@store/root";

import { HashRouter as Router, Route } from "react-router-dom";

const { Content, Footer } = Layout;

function App() {
  const pageProps = {};

  return (
    <Router>
      <Layout>
        <SideBar />
        <Layout style={{ marginLeft: 200 }}>
          <TopBar />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div className={styles.contentWrapper}>
              <Provider store={store}>
                <Route exact path="/">
                  <CustomerFeatures {...pageProps} />
                </Route>
                <Route path="/mf">
                  <ManageFeatures {...pageProps} />
                </Route>
                <Route path="/cf">
                  <CustomerFeatures {...pageProps} />
                </Route>
                <Route path="/audit">
                  <Audit {...pageProps} />
                </Route>
                <Route path="/report">
                  <Report {...pageProps} />
                </Route>
                <Route path="/pkg">
                  <ManagePackages {...pageProps} />
                </Route>
              </Provider>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Conviva Hackathon 2019
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
