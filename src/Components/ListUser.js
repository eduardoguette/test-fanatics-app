import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GetUsers from "../Services/GetUsers";

const DivListUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-users {
    height: 100%;
    margin: 1em auto;
    .media {
      margin: 1em;
      display: flex;
      align-items: center;
      background-color: #000f25;
      border-radius: 8px;
      padding: 1em;
      width: 400px;
      .media-body {
        margin: auto;
        strong {
          color: #fdbf50;
          font-size: 0.9em;
        }
        a {
          text-decoration: none;
          font-size: 1.4em;
          font-weight: 300;
          color: #fdbf50;
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
      font-size: 2em;
      font-weight: 500;
      color: white;
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

  const DivNav = styled.div`
    margin: auto;
    nav > ul {
      li {
        a {
          font-weight: bold;
          color: black;
          padding: 0.7em 1.6em;
        }
      }
      li:hover {
        cursor: pointer;
      }
      .prev {
        display: ${count <= 1 ? "none" : "block"};
        a {
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
    <DivListUser>
      <div className="list-users">
        {users.length > 1 ? (
          users.map(({ first_name, id, avatar, last_name }) => (
            <div className="media" key={id} id={id}>
              <img src={avatar} className="mr-3" alt={first_name} />
              <div className="media-body">
                <strong>Name: </strong>
                <br />
                <a href="#" className="mt-0">
                  {first_name} {last_name}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-result" role="alert">
            no results...
          </div>
        )}
      </div>
      <DivNav>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item prev">
              <a className="page-link" onClick={() => setCount(count - 1)} href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link next" onClick={() => setCount(count + 1)} href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </DivNav>
    </DivListUser>
  );
}

export default ListUser;
