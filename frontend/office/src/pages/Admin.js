import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  BankOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UserOutlined,
  BarChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import UploadOrder from "./admin/UploadOrder";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import Commission from "./admin/Commission";
import Report from "./admin/Report";
import Agencies from "./admin/Agencies";
import Cashiers from "./admin/Cashiers";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        backgroundColor: "white",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          // height: "100vh",
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
          style={{ marginTop: "1.5vh", border: "none" }}
          items={[
            {
              key: "1",
              icon: (
                <Link to="/">
                  <BankOutlined />
                </Link>
              ),
              label: "Agencies",
            },
            {
              key: "2",
              icon: (
                <Link to="/cashiers">
                  <UserOutlined />
                </Link>
              ),
              label: "Cashiers",
            },
            {
              key: "3",
              icon: (
                <Link to="/report">
                  <BarChartOutlined />
                </Link>
              ),
              label: "Report",
            },
            {
              key: "4",
              icon: (
                <Link to="/upload">
                  <UploadOutlined />
                </Link>
              ),
              label: "Upload Order",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
            border: "none",
          }}
        ></Header>
        <Content
          style={{
            margin: "2px 2px",
            padding: 24,
            minHeight: "92vh",
            backgroundColor: "white",
            border: "none",
          }}
        >
          <Routes>
            <Route path="/" element={<Agencies />} />
            <Route path="/agencies/:id" element={<Commission />} />
            <Route path="/cashiers" element={<Cashiers />} />
            <Route path="/report" element={<Report />} />
            <Route path="/upload" element={<UploadOrder />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
