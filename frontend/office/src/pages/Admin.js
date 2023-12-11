import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import Agency from "./admin/Agency";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          height: "100vh",
          paddingTop: "3%",
          backgroundColor: "white",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Agency",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Cashier",
            },
            {
              key: "3",
              icon: <BarChartOutlined />,
              label: "Reports",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "2px 2px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          {/* Content */}
          <Agency />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
