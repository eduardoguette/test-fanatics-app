import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import GetUsers from "../Services/GetUsers";
import styled from "styled-components";
import Spinner from "./Spinner";
import Login from "./Login";

// eslint-disable-next-line
const DivListUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-users {
    height: 100%;
    margin: 1em auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .media {
      margin: 1em;
      background-color: #000f25;
      border-radius: 8px;
      padding: 1em;
      .media-body {
        margin: auto;
        strong {
          color: #fdbf50;
          font-size: 0.9em;
          font-weight: 700;
        }
        a {
          text-decoration: none;
          font-size: 1.3em;
          font-weight: 500;
          color: white;
        }
        a:hover {
          color: #ff6464;
        }
      }
    }
    .media:hover {
      box-shadow: 0 1px 10px #929292;
    }
    img {
      height: 70px;
      border-radius: 100%;
    }

    .no-result {
      font-size: 1em;
      font-weight: 500;
      color: white;
      text-align: center;
    }
  }
`;

function ListUser() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    GetUsers(count).then((data) => {
      // eslint-disable-next-line
      var tmp = localStorage;
      if (localStorage.getItem("login")) {
        setTimeout(() => {
          if (localStorage.length > 1) {
            let arrayLocalStorage = [];
            let newObject = data;
            for (var i in tmp) {
              if (typeof tmp[i] == "function") continue;
              if (typeof tmp[i] == "number") continue;
              if (tmp[i].includes("avatar")) arrayLocalStorage.push(JSON.parse(tmp[i]));
            }

            if (arrayLocalStorage.length > 0) {
              let editUsers = [...arrayLocalStorage, newObject].flat();
              // Filtrar duplicados
              let hash = {};
              editUsers = editUsers.filter((o) => (hash[o.id] ? false : (hash[o.id] = true)));
              //Ordenamos la lista de usuarios por id
              var ordenArray = editUsers.sort((a, b) => a.id - b.id);
              if (data[0] || data[5]) {
                var max = data[5].id;
                var min = data[0].id;
                var usuarios = ordenArray.filter(({ id }) => id <= max && id >= min);
                setUsers(usuarios);
              } else {
                setUsers([]);
              }
            }
          } else {
            console.log(data);
            setUsers(data);
          }
          setLoading(false);
        }, 700);
      } else {
        window.location.href = "/";
      }
    });
  }, [count]);

  const DivNav = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .title-no-users {
      display: ${users.length < 1 && !loading ? "block" : "none"};
      color: white;
      text-align: center;
      margin: 3em auto;
      span {
        text-align: center;
      }
    }
    nav > ul {
      li {
        button {
          font-weight: bold;
          color: #000f25;
          padding: 0.5em 1em;
          font-size: 0.9em;
        }
      }
      li:hover {
        cursor: pointer;
      }
      .prev {
        display: ${count <= 1 ? "none" : "block"};
        button {
          border-radius: ${users.length < 1 ? "4px" : "auto"};
        }
      }
      .next {
        border-radius: ${count <= 1 ? "4px" : "0 10px 10px 0"};
        display: ${users.length < 1 ? "none" : "block"};
      }
    }
  `;

  return (
    <>
    {
      localStorage.getItem("login") ? <>
      <Navbar />
      <DivListUser>
        <div className="container-sm list-users">
          {loading ? (
            <Spinner />
          ) : (
            users.map(({ first_name, id, avatar, last_name }) => (
              <div className="media" key={id} id={id}>
                <img src={avatar} className="mr-3" alt={first_name} />
                <div className="media-body">
                  <strong>Name: </strong>
                  <br />
                  <Link to={`/user/${id}`}>
                    {first_name} {last_name}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <DivNav>
          <div className="title-no-users">
            <p>No more users</p>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item prev">
                <button className="page-link" onClick={() => setCount(count - 1)} href="#">
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link next" onClick={() => setCount(count + 1)} href="#">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </DivNav>
      </DivListUser></> : <Login/>
}
    </>
  );
}

export default ListUser;
