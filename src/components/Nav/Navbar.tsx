import React from "react";
import { Button, PageHeader } from "antd";
import useStore from "../../store/zs";
import useLogout from "../../hooks/auth/useLogout";

export default function Navbar() {
  const auth = useStore((state) => state.auth.isAuthenticated);
  const [logout] = useLogout();

  return (
    <>
      <PageHeader
        title="Test App"
        extra={[
          auth ? (
            <Button id="logout-btn" onClick={logout}>
              Log out
            </Button>
          ) : (
            <></>
          ),
        ]}
      />
    </>
  );
}
