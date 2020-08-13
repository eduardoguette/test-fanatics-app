import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GetUsers from "../Services/GetUsers";

const DivListUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-users {
    height: 100%;
    margin: 3em auto;
    .media {
      margin: 1em;
      display: flex;
      align-items: center;
      background-color: #211f25;
      border-radius: 8px;
      padding: 1em;
      .media-body {
        margin: auto;
        strong {
          color: #fdbf50;
          font-size: .9em;
        }
        a {
          text-decoration: none;
          font-size: 1.4em;
          font-weight: 300;
          color: #fdbf50;
        }
      }
    }
    .media:hover{
      box-shadow: 0 1px 10px #ff646471;
    }
    img {
      height: 70px;
      border-radius: 100%;
    }

    .alert {
      font-size: 1.4em;
      font-weight: 500;
    }
  }
`;
const DivNav = styled.div`
  margin: auto;
  nav > ul {
    li {
      p {
        font-weight: bold;
        color: black;
        padding: 1em 2em;
      }
    }
    li:hover{
      cursor:pointer;
    }
  }
`;

function ListUser() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    GetUsers(count).then((data) => {
      setUsers(data);
    });
  }, [count]);

  return (
    <DivListUser>
      <div className="list-users col-6">
        {users.length > 1 ? (
          users.map(({ first_name, id, avatar,last_name }) => (
            <div className="media" key={id}>
              <img src={avatar} className="mr-3" alt={first_name} />
              <div className="media-body">
                <strong>Name: </strong><br/>
                <a href="#" className="mt-0">
                  {first_name} {last_name}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div class="alert alert-warning" role="alert">
            No hay mas usuarios =(
          </div>
        )}
      </div>
      <DivNav>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <p className="page-link" onClick={() =>  setCount(count - 1)} href="#">
                Previous
              </p>
            </li>
            <li className="page-item">
              <p className="page-link" onClick={() => setCount(count + 1)} href="#">
                Next
              </p>
            </li>
          </ul>
        </nav>
      </DivNav>
    </DivListUser>
  );
}

export default ListUser;
