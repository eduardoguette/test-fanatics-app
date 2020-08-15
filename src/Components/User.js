import React, { useEffect, useState, Fragment } from "react";
import singleUser from "../Services/singleUser";
import styled from "styled-components";
import gif from "../tenor.gif";
import { Link } from "react-router-dom";

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
  .done,
  .form {
    display: none;
  }
  .col.py-3 {
    width: 300px;
    margin: auto;
  }
  img.avatar {
    border-radius: 100%;
    border: 3px solid white;
    padding: 0.5em;
  }
`;

function User() {
  const [users, setUsers] = useState([]);
  const [userUpdate, setuserUpdate] = useState(false);

  useEffect(() => {
    let id = window.location.href.split("user/").pop().trim();
    if (localStorage[id]) {
      setUsers(JSON.parse(localStorage[id]));
    } else {
      if (users.length < 1) {
        singleUser(id).then((data) => {
          setUsers(data);
        });
      }
    }
  }, [userUpdate, users.length]);

  const hadleform = () => {
    document.querySelector(".form").style.display = "block";
    document.querySelector(".container-btns").style.display = "none";
  };
  const handleCancel = () => {
    document.querySelector(".form").style.display = "none"
    document.querySelector(".container-btns").style.display = "block";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector(".name").value;
    const lastName = document.querySelector(".last-name").value;
    const email = document.querySelector(".email").value;
    document.querySelector(".form").style.display = "none";
    document.querySelector(".spinner-grow").style.display = "block";
    setTimeout(() => {
      document.querySelector(".spinner-grow").style.display = "none";
      document.querySelector(".done").style.display = "block";
      setTimeout(() => {
        document.querySelector(".done").style.display = "none";
        document.querySelector(".container-btns").style.display = "block";
      }, 1000);
    }, 1000);
    const user = {
      first_name: name,
      last_name: lastName,
      email: email,
    };
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: headers,
      redirect: "follow",
      mode: "cors",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        const first_name = json.first_name;
        const last_name = json.last_name;
        if (email !== "") {
          var newObject = { first_name, last_name, email };
        } else {
          newObject = { first_name, last_name };
        }
        const returnedTarget = Object.assign(users, newObject);
        setuserUpdate(true);
        localStorage.setItem(users.id, JSON.stringify(returnedTarget));
        setTimeout(() => {
          setUsers(returnedTarget);
          setuserUpdate(false);
        }, 1000);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Fragment>
      <DivUser>
        <div>
          <div className="container-btn back">
            <Link to="/">Atras</Link>
          </div>
          <h1>
            {users.first_name} {users.last_name}
          </h1>
          <p>{users.email}</p>
          <img className="avatar" src={users.avatar} alt={users.first_name} />
        </div>
        <div className="container-btns">
          <button type="button" onClick={hadleform} className="btn btn-info">
            Update Profile
          </button>
          <button type="button" className="btn btn-danger">
            Delete user
          </button>
        </div>
        <div className="container spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="done">
          <img src={gif} alt="gif" />
        </div>
        <form action="#" onSubmit={handleSubmit} className="form">
          <div className="form-col container">
            <div className="col py-3">
              <input type="text" className="form-control name" placeholder="First Name" required />
            </div>
            <div className="col py-3">
              <input type="text" className="form-control last-name" placeholder="Last Name" required />
            </div>
            <div className="col py-3">
              <input type="text" className="form-control email" placeholder="correo@correo.com" />
            </div>
            <button type="button" onClick={handleCancel} className="btn btn-warning">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </DivUser>
    </Fragment>
  );
}

export default User;
