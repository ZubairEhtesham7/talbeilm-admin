import React, { useState } from "react";
import { Layout, Menu, Dropdown, Row, Col } from "antd";
import {
  UserOutlined,
  DesktopOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import "./style.css";
import Dashboard from "../dashBoard";
import Cards from "../cards/Index";
import InstituteTable from "../institute-table";
import Usertable from "../userTable";
import Logo from "../images/pro.png";
import Postable from "../postTable";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/user";

const { Content, Sider } = Layout;

export default function LayoutsMain() {
  const dispatch = useDispatch();
  const [panelId, setpanelId] = useState(1);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <a
              onClick={() => {
                localStorage.removeItem("talbeilm-token");
                localStorage.removeItem("talbeilm-user-id");
                dispatch(setLoginState(false));
              }}
            >
              <p>
                <UserOutlined />
                log out
              </p>
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key={1}
            icon={<DesktopOutlined />}
            onClick={() => setpanelId(1)}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key={2}
            icon={<UserOutlined />}
            onClick={() => setpanelId(2)}
          >
            All posts
          </Menu.Item>
          <Menu.Item
            key={3}
            icon={<IdcardOutlined />}
            onClick={() => setpanelId(3)}
          >
            All Institute
          </Menu.Item>
          <Menu.Item
            key={4}
            icon={<DesktopOutlined />}
            onClick={() => setpanelId(4)}
          >
            All User
          </Menu.Item>
          <Menu.Item
            key={5}
            icon={<DesktopOutlined />}
            onClick={() => setpanelId(5)}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            key={6}
            icon={<DesktopOutlined />}
            onClick={() => setpanelId(6)}
          >
            Images
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <div className="backgroundwhole">
          <div className="dashtextdiv">
            <h1 className="dashtext">user@gmail.com</h1>
            <div className="lgodiv">
              <img className="lgoimg" src={Logo} alt="" />

              <Dropdown overlay={menu}>
                <h1 className="dashtext1">Zubair</h1>
              </Dropdown>
            </div>
          </div>
          <div className="cardsdiv22222">
            <Row justify="space-around" className="cardsdiv3344">
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
            </Row>
          </div>
        </div>

        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            {panelId === 1 && <Dashboard />}
            {panelId === 2 && <Postable />}
            {panelId === 3 && <InstituteTable />}
            {panelId === 4 && <Usertable />}
            {/* {panelId === 5 && <Orders />} */}
            {/* {panelId === 6 && <Images />} */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
