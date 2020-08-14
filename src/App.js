import React, { Fragment } from "react";
import "./Styles/scss/styles.css";
import ListUser from "./Components/ListUser";
import Navbar from "./Components/Navbar";
import User from "./Components/User";
import { BrowserRouter, Route } from "react-router-dom";
function App() {

  return (
    <Fragment>
      <Navbar />
      <BrowserRouter>
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/" component={ListUser} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
