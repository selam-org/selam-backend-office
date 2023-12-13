import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  BankOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import Commission from "./admin/Commission";
import Reports from "./admin/Reports";
import Agencies from "./admin/Agencies";
import Cashiers from "./admin/Cashiers";

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
          backgroundColor: "white",
        }}
      >
        <Button
          type="text"
          icon={
            collapsed ? (
              <CaretRightOutlined style={{ fontSize: "200%" }} />
            ) : (
              <CaretLeftOutlined style={{ fontSize: "200%" }} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "15px",
            width: 64,
            height: 64,
            marginLeft: 5,
          }}
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "1.5vh" }}
          items={[
            {
              key: "1",
              icon: (
                <Link to="/admin/">
                  <BankOutlined />
                </Link>
              ),
              label: "Agencies",
            },
            {
              key: "2",
              icon: (
                <Link to="/admin/cashiers">
                  <UserOutlined />
                </Link>
              ),
              label: "Cashiers",
            },
            {
              key: "3",
              icon: (
                <Link to="/admin/reports">
                  <BarChartOutlined />
                </Link>
              ),
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
        ></Header>
        <Content
          style={{
            margin: "2px 2px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Routes>
            <Route path="/" element={<Agencies />} />
            <Route path="/agencies/:agencyId" element={<Commission />} />
            <Route path="/cashiers" element={<Cashiers />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
