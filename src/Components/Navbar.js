import React from "react";
import styled from "styled-components";
import logo from "../logo.png"
const DivNavBar = styled.div`
.navbar{
  padding: 3em 0 0 4em;
  img{
    height: 3em;
  }
}
`;
function Navbar() {
  return (
    <DivNavBar>
      <nav className="navbar navbar-light ">
        <a className="navbar-brand" href="#">
          <img src={logo} height="70" className="d-inline-block align-top" alt="top" loading="lazy" />
        </a>
      </nav>
    </DivNavBar>
  );
}

export default Navbar;
