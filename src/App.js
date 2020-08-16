import React, { Fragment } from "react";
import "./Styles/scss/styles.css";
import ListUser from "./Components/ListUser";

import User from "./Components/User";
import Login from "./Components/Login";
import { BrowserRouter, Route } from "react-router-dom";
function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/home" component={ListUser} />
        <Route exact path="/" component={Login} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
