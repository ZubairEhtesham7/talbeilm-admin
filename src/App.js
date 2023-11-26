import React, { useEffect, useState } from "react";
import "./App.css";
import Router22 from "./routes";
import { users } from "./helper/axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLoginState, setUser } from "./redux/user";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    let userId = localStorage.getItem("talbeilm-user-id");
    let token = localStorage.getItem("talbeilm-token");

    if (userId !== null && token !== null) {
      users(`/${userId}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          message.success("login success");
          setloading(false);
          dispatch(setUser(res.data));
          dispatch(setLoginState(true));
        })
        .catch(() => {
          message.error("an error occured please login again");
          setloading(false);
        });
    } else {
      setloading(false);
    }
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div
          style={{
            height: "100vh",
            Width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <LoadingOutlined style={{ fontSize: "1.6rem" }} />{" "}
        </div>
      ) : (
        <Router22 />
      )}
    </div>
  );
}

export default App;
