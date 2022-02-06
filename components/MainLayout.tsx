import { Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const MainLayout = () => {
  const Router = useRouter();
  const [data, setData]: any = useState();
  useEffect(() => {
    const admin = Cookies.get("adminToken");
    if (admin) setData({ name: "Admin" });
  }, []);
  const logout = () => {
    Cookies.remove("adminToken");
    Cookies.remove("admin");
    Router.push("/login");
  };
  const content = (
    <div>
      <Button onClick={logout} danger type="primary">
        Logout
      </Button>
    </div>
  );

  return (
    <nav>
      <Link href="/">
        <div style={{ cursor: "pointer" }} className="logo-wrapper">
          <img src="./icons/logoIcon.svg" alt="" />
          <h1 className="logo">CallageStore</h1>
        </div>
      </Link>
      <Popover content={content} trigger="click">
        <div className="avatar-wrapper">
          {data && <h1>{data.name}</h1>}
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </Popover>
    </nav>
  );
};

export default MainLayout;
