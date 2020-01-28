import React from "react";
import { Spacer } from "@components/Utils";
import { Menu, Icon, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

import * as styles from "./index.module.less";
import logo from "@images/logo.png";

const { Header, Sider } = Layout;

export const TopBar = () => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <div className={styles.userWrap}>
        <Icon type="user" />
        <Spacer width={20} />
        <Icon type="logout" />
      </div>
    </Header>
  );
};

export function RenderMenu() {
  const location = useLocation();
  const selected = location.pathname == "/" ? "/cf" : location.pathname;

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]}>
      <Menu.Item key="/mf">
        <Link to="/mf">
          <Icon type="flag" />
          <span className="nav-text">Manage Features</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/cf">
        <Link to="/cf">
          <Icon type="deployment-unit" />
          <span className="nav-text">Customer Features</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/pkg">
        <Link to="/pkg">
          <Icon type="container" />
          <span className="nav-text">Manage Packages</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/audit">
        <Link to="/audit">
          <Icon type="audit" />
          <span className="nav-text">Audit</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/report">
        <Link to="/report">
          <Icon type="file-search" />
          <span className="nav-text">Reports</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export function SideBar() {
  const [collapsed, setCollapsed] = React.useState(false);

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  return (
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
      <RenderMenu />
    </Sider>
  );
}
