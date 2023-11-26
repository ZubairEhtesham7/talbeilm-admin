import React, { useState } from "react";
import "./style.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message, Button } from "antd";
import { login } from "../../helper/axios";
import { useDispatch } from "react-redux";
import { setLoginState, setUser } from "../../redux/user";

function SignIn() {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const onFinish = (values) => {
    setloading(true);

    login({
      method: "post",
      data: values,
    })
      .then((res) => {
        console.log(res.data);
        message.success("login success");
        localStorage.setItem("talbeilm-token", res.data.tokens.access.token);
        localStorage.setItem("talbeilm-user-id", res.data.user.id);
        setloading(false);
        dispatch(setUser(res.data.user));
        dispatch(setLoginState(true));
      })
      .catch(() => {
        message.error("an error occured please try later");
        setloading(false);
      });
  };

  return (
    <div className="main">
      <div className="box">
        <h1 className="sign">Sign In</h1>
        <br />
        <br />

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
