import React, { useState } from "react";

import logo from "../logo.png";
import styled from "styled-components";
import FormularioLog from "./FormularioLog";

const DivLogo = styled.div`
  img {
    height: 4em;
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
      <FormularioLog errorAutent={errorAutent} hadleLog={hadleLog}/>
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
