import React, {useState} from "react";
import {useEffect} from "react";

const App = () => {
  const [message, setMessage] = useState("");

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
    <div>
      <h1>User Manage Website</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
