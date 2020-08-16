import React from "react";
import styled from "styled-components"
const DivError = styled.div`
  font-weight: 300;
  text-align: center;
  width: 250px;
  font-size: .7em;
  color: red;
  padding: 1em 0;
`
function ErrorAutentication() {
  return (
    <DivError>
      <p>Usuario no registrado. Comprueba el nombre de usuario y vuelve a intentarlo.</p>
    </DivError>
  );
}

export default ErrorAutentication;
