import React, { useState } from "react";

import logo from "../logo.png";
import styled from "styled-components";
import ErrorAutentication from "./ErrorAutentication";
const DivLogo = styled.div`
  img {
    height: 4em;
  }
`;

const DivFormulario = styled.div`
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: white;
  padding: 2em;
  background-color: #160b29;
  max-height: 380px;
  h2 {
    margin-bottom: 1em;
    font-weight: 700;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-top: -1em;
    input {
      margin: 0.6em 0;
      height: 2.5em;
      width: 250px;
      outline-color: rgb(252, 234, 74);
      border: none;
      order: 2;
      transition: 0.4s ease;
      &:focus ~ label {
        font-size: 0.9em;
        color: #ff6464;
        position: relative;
        top: 0.7em;
        transition: 0.4s ease;
      }
    }
    label {
      order: 1;
      transition: 0.4s ease;
      font-size: 0.8em;
      position: relative;
      top: 0.5em;
    }
    .face {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    @keyframes shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }
  }
`;
function Login() {
  const [errorAutent, seterrorAutent] = useState(false);

  const hadleLog = (e) => {
    const email = document.querySelector("#exampleInputEmail1").value;
    const pass = document.querySelector("#exampleInputPassword1").value;
    sessionStorage.setItem("email", email);
    e.preventDefault();
    //fetch
    entrar(email, pass).then((data) => {
      if (data.token) {
        const token = data.token;
        localStorage.setItem("login", token);
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      } else {
        document.querySelector("#exampleInputEmail1").classList.add("face");
        document.querySelector("#exampleInputPassword1").classList.add("face");
        seterrorAutent(true);
        setTimeout(() => {
          document.querySelector("#exampleInputEmail1").classList.remove("face");
          document.querySelector("#exampleInputPassword1").classList.remove("face");
          setTimeout(() => {
            seterrorAutent(false);
          }, 5000);
        }, 1000);
      }
    });
  };

  return (
    <div className="container log">
      <DivLogo>
        <img src={logo} alt="logo" />
      </DivLogo>
      <DivFormulario>
        <div className="login-box">
          <h2>Login</h2>
          <form action="#" onSubmit={hadleLog}>
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="eve.holt@reqres.in" />
              <label>Username</label>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="exampleInputPassword1" />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {errorAutent ? <ErrorAutentication /> : <></>}
          </form>
        </div>
      </DivFormulario>
    </div>
  );
}

export default Login;

async function entrar(email, pass) {
  const user = {
    email: email,
    password: pass,
  };
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("Error:", err));
  return response;
}
