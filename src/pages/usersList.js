import React, { useEffect, useState } from "react";
import style from "./allpages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../services/apiservices";

const UsersList = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
 
  const handleClick = () => {
    navigate("/new");
  };
  const editHandler = (id) => {
    navigate(`/new?id=${id}`);
  };
  const fetchData  = async () => {
    try {
      const res = await get("userList");
      console.log(res,"==res")
      setUserData(res?.result?.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
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
            
          {userData.map((data) => 
          (
            
            <tr key={data.id}>

              <td>{sno++}</td>
              <td>{data.user_name}</td>
              <td>{data.p5_balance}</td>
              <td>{data.reward_balance}</td>
              <td>
                <button onClick={() => editHandler(data.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
