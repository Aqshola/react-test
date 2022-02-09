import { Button, Form, Input, Alert } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/zs";
import supabase from "../supa/supabase";
import { LocationState } from "../types/type";



function SignUp() {
  const navigate = useNavigate();
  const location= useLocation()
  const [errorAuth, seterrorAuth] = useState({
    show: false,
    msg: "",
  });
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const setLogin = useStore((state) => state.login);

  const initSignIn = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (user) {
      setLogin(user);
      let from=(location.state as LocationState)?.from.pathname || "/"
      return navigate(from, { replace: true });
    }

    if (error) {
      seterrorAuth({ ...errorAuth, msg: error?.message, show: true });
    }
  };
  return (
    <>
      {errorAuth.show && (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <Alert message={errorAuth.msg} type="error" closable />
        </div>
      )}
      <Title style={{ textAlign: "center" }}>Sign up your account</Title>
      <Form
        onFinish={initSignIn}
        layout="vertical"
        style={{ margin: "auto", maxWidth: "500px" }}
      >
        <Form.Item label="Email" htmlFor="email">
          <Input
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
            id="email"
            required
            name="email"
            placeholder="Email"
            type={"email"}
          />
        </Form.Item>
        <Form.Item label="Password" htmlFor="password">
          <Input.Password
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
            id="password"
            name="password"
            required
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Link to={"/login"}>Log in</Link>
        </Form.Item>
        <Form.Item>
          <Button
            id="login-btn"
            style={{ float: "right" }}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignUp;
