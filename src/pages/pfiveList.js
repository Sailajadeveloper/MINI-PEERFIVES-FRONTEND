import React, { useEffect, useRef, useState } from "react";
import style from "./allpages.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteReq, get } from "../services/apiservices";

const PfiveList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const handleClick = () => {
    navigate(`/${id}/rewards/new`);
  };
  const effectRan = useRef(false);
  const fetchData = async () => {
    try {
      const res = await get(`users/${id}/points`);
      setData(res?.result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (effectRan.current === false && id && id !== null && id != '' && id != undefined) {
      fetchData();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  const reverseTranscation = async (event, Id) => {
    event.preventDefault();
    const res = await deleteReq(`users/p5/${Id}`);
    if (res?.result?.status === true) {
      fetchData();
    }
    //(res, "==res");
    // setData(res?.result?.data);
  };
  let sno = 1;
  if (data.length === 0) {
    return (
      <div className={style.card}>
        <div>
          <h4>No Data Found</h4>
        </div>
        <div>
        <button onClick={handleClick}>Add</button>
      </div>
      </div>
    );
  }
  return (
    <div className={style.card}>
      <div>
        <h4>P5 List</h4>
      </div>
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>S No</th>
            <th>P5 Given</th>
            <th>Name Of Recipent</th>
            <th>Date Time</th>
            <th>Reverse Transcation</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((pfive) => (
            <tr key={pfive.id}>
              <td>{sno++}</td>
              <td>{pfive.points}</td>
              <td>{pfive.given_to_name}</td>
              <td>{pfive.timestamp}</td>
              <td>
                <button onClick={(e) => reverseTranscation(e, pfive.id)}>
                  Delete
                </button>
              </td>
              {/* <td>{pfive.login}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PfiveList;
