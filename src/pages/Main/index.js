import React from "react";
import { Layout, Menu, Icon } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import axios from "axios";
import Audit from "./Audit";
import CustomerFeatures from "./CustomerFeatures";
import Report from "./Report";
import ManageFeatures from "./ManageFeatures";
import ManagePackages from "./ManagePackages";
import { serverUrl, TopBar, packages } from "./utils";

import logo from "@images/logo.png";

import * as styles from "./index.module.less";

const Pages = {
  mf: ManageFeatures,
  cf: CustomerFeatures,
  audit: Audit,
  report: Report,
  pkg: ManagePackages
};

const Page = ({ selected, customers, products }) => {
  const P = Pages[selected];
  const props = {
    customers,
    products,
    packages
  };
  return <P {...props} />;
};

const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("cf");
  const [customers, setCustomers] = React.useState({});
  const [products, setProducts] = React.useState({});

  function onCollapse(collapsed) {
    console.log(collapsed);
    setCollapsed(collapsed);
  }

  function handleMenuClick({ key }) {
    console.log("menuclick", key);
    setCurrentPage(key);
  }

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

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo" style={{ height: 64 }}>
          <img className="logo-img" src={logo} alt="LOGO" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["cf"]}>
          <Menu.Item key="cf" onClick={handleMenuClick}>
            <Icon type="deployment-unit" />
            <span className="nav-text">Customer Features</span>
          </Menu.Item>
          <Menu.Item key="mf" onClick={handleMenuClick}>
            <Icon type="flag" />
            <span className="nav-text">Manage Features</span>
          </Menu.Item>
          <Menu.Item key="pkg" onClick={handleMenuClick}>
            <Icon type="container" />
            <span className="nav-text">Manage Packages</span>
          </Menu.Item>
          <Menu.Item key="audit" onClick={handleMenuClick}>
            <Icon type="audit" />
            <span className="nav-text">Audit</span>
          </Menu.Item>
          <Menu.Item key="report" onClick={handleMenuClick}>
            <Icon type="file-search" />
            <span className="nav-text">Reports</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <TopBar />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className={styles.contentWrapper}>
            <Page
              selected={currentPage}
              customers={customers}
              products={products}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Conviva Hackathon 2019 | Team Forty Two
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
