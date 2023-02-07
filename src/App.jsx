import React, { useContext, useEffect, useState } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
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
      <div className="columns is-centered">
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Login />
            </div>
          ) : (
            <Table />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
