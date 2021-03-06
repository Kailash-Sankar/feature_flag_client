import React from "react";
import { Spacer } from "@components/Utils";
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

import * as styles from "./index.module.less";
//import logo from "@images/logo.png";

import { 
  FlagOutlined, 
  DeploymentUnitOutlined, 
  ContainerOutlined,
  AuditOutlined,
  FileSearchOutlined,
  UserOutlined,
  LogoutOutlined,
  ControlOutlined,
} from '@ant-design/icons';

const { Header, Sider } = Layout;

export const TopBar = () => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <div className={styles.userWrap}>
        <UserOutlined />
        <Spacer width={20} />
        <LogoutOutlined />
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
          <DeploymentUnitOutlined />
          <span className="nav-text">Manage Features</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/cf">
        <Link to="/cf">
          <ControlOutlined />
          <span className="nav-text">Customer Features</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/pkg">
        <Link to="/pkg">
          <ContainerOutlined />
          <span className="nav-text">Manage Packages</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/audit">
        <Link to="/audit">
          <AuditOutlined />
          <span className="nav-text">Audit</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/report">
        <Link to="/report">
          <FileSearchOutlined />
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
        <FlagOutlined /> 
        <span className="logo-text"> Feature Flags </span>
        {/*
          <img className="logo-img" src={logo} alt="LOGO" />
        */}
      </div>
      <RenderMenu />
    </Sider>
  );
}
