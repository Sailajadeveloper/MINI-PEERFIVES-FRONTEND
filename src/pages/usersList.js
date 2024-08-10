import React, { useEffect, useRef, useState } from "react";
import style from "./allpages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../services/apiservices";
import useUsersList from "../customHooks/useUsersList";
import { toast } from "react-toastify";

const UsersList = () => {
  const navigate = useNavigate();
  const userData = useUsersList();
  const effectRan = useRef(false);
  if (userData.length > 0) {
    if (effectRan.current === false) {
      toast.success("Data fetched successfully");
      return (effectRan.current = true);
    }
  }
  //(userData, "===userData");
  //   const [userData, setUserData] = useState([]);

  const handleClick = () => {
    navigate("/new");
  };
  const editHandler = (event, id) => {
    event.preventDefault();
    navigate(`/new?id=${id}`);
  };

  let sno = 1;
  return (
    <div className={style.card}>
      <div>
        <h4>Users List</h4>
      </div>
      <div>
        <button onClick={handleClick}>Add User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>S No</th>
            <th>User Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.length > 0 &&
            userData.map((data) => (
              <tr key={data.id}>
                <td>{sno++}</td>
                <td>{data.user_name}</td>
                <td>{data.p5_balance}</td>
                <td>{data.reward_balance}</td>
                <td>
                  <button onClick={(e) => editHandler(e, data.id)}>Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
