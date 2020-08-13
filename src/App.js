import React, { Fragment } from "react";
import "./Styles/scss/styles.css";
import ListUser from "./Components/ListUser";
import Navbar from "./Components/Navbar";
import User from "./Components/User";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/">
            <ListUser />
          </Route>
          <Route path="/search/:id">
            <User />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
