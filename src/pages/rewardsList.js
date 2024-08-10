import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./allpages.module.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { get } from "../services/apiservices";

const RewardsList = () => {
  const { id } = useParams();
  //(id, "==id"); // Should log the ID from the URL
  const effectRan = useRef(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (effectRan.current === false && id && id !== null && id != '' && id != undefined) {
      
      const fetchData = async () => {
        try {
          const res = await get(`users/${id}/rewards`);
          setData(res?.result?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      return () => {
        effectRan.current = true;
      };
    }
  }, [id]);
  let sno = 1;
  if (data.length === 0) {
    return (
      <div className={style.card}>
        <div>
          <h4>No Data Found</h4>
        </div>
      </div>
    );
  }
  return (
    <div className={style.card}>
      <div>
        <h4>Reward List</h4>
      </div>
      <table>
        <thead>
          <tr>
            <th>S No</th>
            <th>Given User Name</th>
            <th>Points Recived</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((reward) => (
            <tr key={reward.id}>
              <td>{sno++}</td>
              <td>{reward.given_by_name}</td>
              <td>{reward.points}</td>
              <td>{reward.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsList;
