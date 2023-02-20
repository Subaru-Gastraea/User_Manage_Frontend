import React, { useContext } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [token] = useContext(UserContext);

  return (
    <>
      <Header title="User Manage Website" />
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
