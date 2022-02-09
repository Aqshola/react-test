import React, { useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Alert } from "antd";
import Title from "antd/lib/typography/Title";
import { LocationState } from "../types/type";
import useForm from "../hooks/form/useForm";
import useLogin from "../hooks/auth/useLogin";

const Login = () => {
  const [formChange, formData] = useForm({
    email: "",
    password: "",
  });
  const [login, data, loading, error] = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const fromUrl = (location.state as LocationState)?.from.pathname || "/";

  useEffect(() => {
    if (data) {
      return navigate(fromUrl, { replace: true });
    }
  }, [data]);

  return (
    <>
      {error.status && (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <Alert message={error.message} type="error" closable />
        </div>
      )}

      <Title style={{ textAlign: "center" }}>Login Notes</Title>

      <Form
        onFinish={()=>login(formData.email, formData.password)}
        layout="vertical"
        style={{ margin: "auto", maxWidth: "500px" }}
        aria-label="loginForm"
      >
        <Form.Item label="Email" htmlFor="email">
          <Input
            id="email"
            onChange={formChange}
            required
            name="email"
            placeholder="Email"
            type={"email"}
          />
        </Form.Item>
        <Form.Item label="Password" htmlFor="password">
          <Input.Password
            id="password"
            onChange={formChange}
            name="password"
            required
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Link to={"/signup"}>Sign up</Link>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            id="login-btn"
            style={{ float: "right" }}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
