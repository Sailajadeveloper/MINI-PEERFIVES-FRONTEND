
import React, { useEffect } from "react";
import style from "./allpages.module.css";
import { Link, useNavigate } from "react-router-dom";

const PfiveList = () => {
    const navigate= useNavigate();
  const dummyData = [
    {
      sno: 1,
      id: 1,
      name: "Vamsi",
      p5Balance: 0,
      rewardBalance: 0,
      login: 0,
    },
    {
      sno: 2,
      id: 2,
      name: "Vamsi",
      p5Balance: 0,
      rewardBalance: 0,
      login: 0,
    },
  ];
  const handleClick = () => {
    navigate('/user/5/rewards/new');
  };
  useEffect(() => {}, []);
  return (
    <div className={style.card}>
        <div>
           <h4>P5 List</h4>
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
          {dummyData.map((data) => (
            <tr key={data.id} onClick={handleClick}>
              <td>{data.sno}</td>
              <td>{data.name}</td>
              <td>{data.p5Balance}</td>
              <td>{data.rewardBalance}</td>
              <td>{data.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PfiveList;


