import React, { useState } from "react";
import styled from "styled-components";
import logo from "../logo.png";
import perfil from "../perfil.png";
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
        &:hover {
          cursor: pointer;
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
  const [clickprofile, setclickprofile] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("login");
    sessionStorage.removeItem("email");
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };
  const DivProfile = styled.div`
    .list {
      display: none;
    }
    .perfil {
      height: 2.4em !important;
      width: 2.4em !important;
      cursor: pointer;
      padding: 0.2em;
      & ~ .list.active {
        font-weight: 400;
        display: block;
        color: black;
        text-align: center;
        width: 150px;
        height: 60px;
        position: absolute;
        top: 6.5em;
        font-size: 0.8em;
        z-index: 1;
        right: 5.3em;
        background-color: #dee2f8;
        border-radius: 5px;
        &::after {
          content: "";
          z-index: -1;
          position: absolute;
          height: 1em;
          width: 1em;
          bottom: 3.75em;
          right: 2em;
          background-color: #dee2f8;
          transform: rotate(45deg);
        }
        label {
          cursor: pointer;
          &:hover {
            color: #ff6464;
          }
        }
        .c-email {
          padding-top: 0.5em;
        }
      }
    }
  `;
  const handleClick = () => {
    document.querySelector(".list").classList.toggle("active");
  };

  return (
    <DivNavBar>
      <nav className="navbar navbar-light ">
        <Link className="navbar-brand" to="/home">
          <img className="logo-ppal" src={logo} height="70" alt="top" loading="lazy" />
        </Link>
        <div className="sesion">
          <DivProfile>
            <img className="perfil" onClick={handleClick} src={perfil} alt="logo" />
            <div class="list">
              <label className="c-email">{sessionStorage.getItem("email")}</label>
              <label onClick={handleSignOut}>Salir</label>
            </div>
          </DivProfile>
        </div>
      </nav>
    </DivNavBar>
  );
}

export default Navbar;
