import React, { useEffect, useState, Fragment } from "react";
import singleUser from "../Services/singleUser";
import styled from "styled-components";
import gif from "../tenor.gif"

const DivUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-align: center;

  button {
    margin: 2em;
  }
  .spinner-grow,
  .done,form {
    display: none;
  }
`;

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let id = window.location.href.split("user/").pop().trim();

    singleUser(id).then((data) => {
      setUsers(data);
    });
  }, []);
  const hadleform = () => {
    document.querySelector("form").style.display = "block"
  }

  const handleSubmit = () => {
    const name = document.querySelector(".name").value;
    const lastName = document.querySelector(".last-name").value;
    const email = document.querySelector(".email").value;
    document.querySelector("form").style.display = "none";
    console.log(name, lastName, email);
    document.querySelector(".spinner-grow").style.display = "block";
    setTimeout(() => {
      document.querySelector(".spinner-grow").style.display = "none";
      document.querySelector(".done").style.display = "block";
      setTimeout(() => {
        document.querySelector(".done").style.display = "none";
      }, 2000);
    },2000);

    


  };

  return (
    <Fragment>
      <DivUser>
        <div>
          <h1>
            {users.first_name} {users.last_name}
          </h1>
          <p>{users.email}</p>
          <img src={users.avatar} alt={users.first_name} />
        </div>
        <div>
          <button type="button" onClick={hadleform} className="btn btn-info">
            Edit Profile
          </button>
        </div>
        <div className="container spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="done">
          <img src={gif} alt="gif" />
        </div>
        <form action="#">
          <div className="form-col container">
            <div className="col py-3">
              <input type="text" className="form-control name" placeholder="First Name" />
            </div>
            <div className="col py-3">
              <input type="text" className="form-control last-name" placeholder="Last Name" />
            </div>
            <div className="col py-3">
              <input type="text" className="form-control email" placeholder="correo@correo.com" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </DivUser>
    </Fragment>
  );
}

export default User;
