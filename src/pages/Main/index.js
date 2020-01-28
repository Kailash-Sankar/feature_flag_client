import React from "react";
import { Layout } from "antd";
import axios from "axios";
import Audit from "./Audit";
import CustomerFeatures from "./CustomerFeatures";
import Report from "./Report";
import ManageFeatures from "./ManageFeatures";
import ManagePackages from "./ManagePackages";
import { serverUrl, packages } from "./utils";

import {TopBar, SideBar} from "@components/Navigation";


import * as styles from "./index.module.less";
import { Provider } from 'react-redux';
import store from "@store/root";

import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

const { Content, Footer } = Layout;

function App() {
  const [customers, setCustomers] = React.useState({});
  const [products, setProducts] = React.useState({});

  function createMap(data) {
    const parsed = {};
    data.forEach(row => {
      parsed[row.id] = row;
    });
    return parsed;
  }

  React.useState(async () => {
    async function fetchData() {
      const customers = await axios.get(`${serverUrl}/meta/customers`);
      const products = await axios.get(`${serverUrl}/meta/products`);
      const parsedCustomers = createMap(customers.data.data);
      const parsedProducts = createMap(products.data.data);

      console.log("load", parsedCustomers, parsedProducts);

      setCustomers(parsedCustomers);
      setProducts(parsedProducts);
    }
    fetchData();
  }, []);

  const pageProps = {
    customers,
    products,
    packages
  };

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
                  <ManageFeatures {...pageProps}/>
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
