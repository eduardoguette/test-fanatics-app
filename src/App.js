import React, { Fragment } from "react";
import "./Styles/scss/styles.css";
import ListUser from "./Components/ListUser";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <ListUser />
    </Fragment>
  );
}

export default App;
