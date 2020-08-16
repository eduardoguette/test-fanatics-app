import React from "react";
import styled from "styled-components";
import logo from "../logo.png";
import perfil from "../perfil.png";
import sign from "../sign-in.svg";
import { Link } from "react-router-dom";
const DivNavBar = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2em 4em;
    .logo-ppal {
      height: 2.4em;
    }
    .sesion {
      .login {
        height: 1.6em;
        &:hover{
          cursor:pointer;
        }
      }
      .perfil {
        height: 2em;
        border-radius: 100%;
        margin-right: 1em;
      }
    }
  }
`;
function Navbar() {
  const handleSignOut = () => {
    localStorage.removeItem("login");
    setTimeout(()=>{
      window.location.href = "/";
    }, 300)
  };

  return (
    <DivNavBar>
      <nav className="navbar navbar-light ">
        <Link className="navbar-brand" to="/home">
          <img className="logo-ppal" src={logo} height="70" alt="top" loading="lazy" />
        </Link>
        <div className="sesion">
          <img className="perfil" src={perfil} alt="logo" />

          <img onClick={handleSignOut} className="login" src={sign} alt="logo" />
        </div>
      </nav>
    </DivNavBar>
  );
}

export default Navbar;
