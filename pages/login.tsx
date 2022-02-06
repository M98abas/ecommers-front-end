import { Form, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import { ApiLogin } from "../api";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const Router = useRouter();
  const [loading, setLoading]: any = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    ApiLogin(values, (data: any, error: any) => {
      setLoading(false);
      // console.log(data.token);
      if (error) return message.error("Invalid Credentials");
      Cookies.set("adminToken", data.token);
      Router.push("/");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Form
        className="login-form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <p>Email</p>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="name@domain.com" size="large" />
        </Form.Item>
        <p>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="***********" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            size="large"
            className="submit-btn"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
        <div className="links-container">
          <p>Don't have an account?</p>
          <Link href="/signup">
            <p className="sign-up-link">Sign Up</p>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
