import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Navigation from "./component/navigation";
import Home from "./page/home";
import Login from "./page/login";
import Users from "./page/users";
import NotFound from "./page/not-found";
import request from "./service/request";
import "antd/dist/antd.css";
import "./app.css";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    try {
      const user = await request("/api/auth/user-state");
      if (user?.id && user?.type) setUser(user);
    } catch (error) {}
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SyncOutlined spin style={{ fontSize: "100px" }} />;
      </div>
    );
  }

  return (
    <Layout style={{ display: "block", minHeight: "100vh" }}>
      <Layout style={{ maxWidth: "1200px", margin: "auto" }}>
        <Navigation user={user} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/shop/users/:shopId" element={<Users user={user} />} />
            <Route path="/" element={<Home user={user} />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* <Layout.Footer style={{ textAlign: "center" }}>Oger ©2018</Layout.Footer> */}
      </Layout>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
