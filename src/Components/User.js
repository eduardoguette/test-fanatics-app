import React, { useEffect, useState, Fragment } from "react";
import singleUser from "../Services/singleUser";
import styled from "styled-components";
import Navbar from "./Navbar"
import { Link } from "react-router-dom";

const DivMsg = styled.div`
  p {
    text-align: center;
    margin: auto;
    color: white;
  }
`;

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
  .form,
  #myDiv {
    display: none;
  }
  .col.py-3 {
    width: 300px;
    margin: auto;
  }
  .check {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      text-align: center;
      font-weight: 400;
      font-size: 0.8em !important;
    }
  }
  img.avatar {
    border-radius: 100%;
    border: 3px solid white;
    padding: 0.5em;
  }
  img.avatar:hover {
    cursor: pointer;
    border: 3px solid linear-gradient(red, blue);
  }
  .animate-bottom {
    position: relative;
    -webkit-animation-name: animatebottom;
    -webkit-animation-duration: 1s;
    animation-name: animatebottom;
    animation-duration: 1s;
    h2{
      font-size: 1em;
    }
  }
  .delete {
    position: relative;
    animation: fade .7s ease;
  }
  @keyframes fade {
    from {
      opacity: 100;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
  @-webkit-keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0px;
      opacity: 1;
    }
  }

  @keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }
`;

function User() {
  const [users, setUsers] = useState([]);
  const [userDelete, setUserDelete] = useState(false);

  const [userUpdate, setuserUpdate] = useState(false);

  let id = window.location.href.split("user/").pop().trim();
  id = parseInt(id);

  useEffect(() => {
    if (localStorage[id]) {
      setUsers(JSON.parse(localStorage[id]));
    } else {
      if (users.length < 1) {
        singleUser(id).then((data) => {
          setUsers(data);
        });
      }
    }
    setUserDelete(false);
  }, [userUpdate, id, users.length]);

  const hadleform = () => {
    document.querySelector(".form").style.display = "block";
    document.querySelector(".container-btns").style.display = "none";
  };
  const handleCancel = () => {
    document.querySelector(".form").style.display = "none";
    document.querySelector(".container-btns").style.display = "block";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector(".name").value;
    const lastName = document.querySelector(".last-name").value;
    var changesUpdates = document.querySelector("input[type=checkbox]").checked;
    const email = document.querySelector(".email").value;
    document.querySelector(".form").style.display = "none";
    document.querySelector(".spinner-grow").style.display = "block";
    setTimeout(() => {
      document.querySelector(".spinner-grow").style.display = "none";
      document.querySelector(".container-btns").style.display = "block";
      document.getElementById("myDiv").style.display = "block";
      setTimeout(() => {
        if (document.getElementById("myDiv")) document.getElementById("myDiv").style.display = "none";
      }, 10000);
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
        if (changesUpdates) {
          localStorage.setItem(users.id, JSON.stringify(returnedTarget));
          setTimeout(() => {
            setUsers(returnedTarget);
            setuserUpdate(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setUsers(returnedTarget);
            setuserUpdate(false);
          }, 1000);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    }).then((resp) => resp.text());
    console.log("user delete");
    document.querySelector(".info-profile").classList.add("delete");
    setTimeout(() => {
      setUserDelete(true);
    }, 500);
  };
  return (
    <Fragment>
      <Navbar/>
      <div className="container-btn back">
        <Link to="/home">
          <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 0 24 24" width="34">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" fill="white" />
          </svg>
        </Link>
      </div>
      {!userDelete ? (
        <DivUser>
          <div className="container info-profile">
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
            <button type="button" onClick={handleDelete} className="btn btn-danger">
              Delete user
            </button>
          </div>
          <div className="container spinner-grow mt-5 text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div id="myDiv" className="animate-bottom">
            <h2>Profile Updated! 🎉</h2>
          </div>
          <form action="#" onSubmit={handleSubmit} className="form container-md">
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
              <div className="col py-3 check">
                <input type="checkbox" id="ls" />
                <label for="ls">¿Quieres que los cambios sean permanentes?</label>
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
      ) : (
        <DivMsg>
          <p>Usuario eliminado</p>
        </DivMsg>
      )}
    </Fragment>
  );
}
export default User;
