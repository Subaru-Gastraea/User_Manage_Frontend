import React, { useContext, useEffect, useState } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelMsg = async () => {
    const requestOp = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOp);
    const data = await response.json();

    setMessage(data.message);
  };

  useEffect(() => {
    getWelMsg();
  }, [])

  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Login />
            </div>
          ) : (
            <p>Table</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
