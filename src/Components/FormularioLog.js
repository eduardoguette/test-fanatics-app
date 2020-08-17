import React from 'react'
import styled from "styled-components"

import ErrorAutentication from "./ErrorAutentication";
const DivFormulario = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: white;
  padding: 2em;
  background-color: #160b29;
  max-height: 360px;
  &:hover {
    box-shadow: 0px 0px 20px #413557a4;
  }
  h2 {
    margin-bottom: 1em;
    font-weight: 700;
  }
  .form-check {
    display: flex;
    align-items: center;
    margin-top: -1em;
    margin-bottom: 1em;
    input {
      margin-top: 0;
      margin-bottom: 0;
    }
    label {
      margin: 0;
      font-size: 0.8em;
      font-weight: 300;
    }
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

function FormularioLog({errorAutent,hadleLog}) {
  return (
    <DivFormulario>
    <div className="login-box">
      <h2>Login</h2>
      <form action="#" onSubmit={hadleLog}>
        <div className="form-group">
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="eve.holt@reqres.in" required />
          <label>Username</label>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="exampleInputPassword1" required />
          <label>Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {errorAutent ? <ErrorAutentication /> : <></>}
      </form>
    </div>
  </DivFormulario>
  )
}

export default FormularioLog
