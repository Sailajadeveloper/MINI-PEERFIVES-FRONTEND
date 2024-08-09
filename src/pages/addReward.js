import React, { useState } from "react";
import style from "./allpages.module.css";
import { useNavigate } from "react-router-dom";
import { post } from "../services/apiservices";

const AddReward = () => {
  const defaultData = {
    name: "",
    p5Points: 0,
    p5Balance: 0,
  };

  const [state, setState] = useState(defaultData);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const AddHandler = async (e) => {
    e.preventDefault(); 
    const payload = {
      name: state.name,
      p5Points: state.p5Points,
    };
    try {
      const res = await post("new", payload);
      navigate("/rewards");
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  const inputChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style["form-container"]}>
      <form onSubmit={AddHandler}>
        <div className={style["form-group"]}>
          <label>User Dropdown</label>
          <select
            className={style["form-control"]}
            name="name"
            onChange={inputChangeHandler}
            value={state.name}
          >
            <option value="">Select a User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>
        <div className={style["form-group"]}>
          <label>P5 Points</label>
          <input
            type="number"
            max="100"
            placeholder="Enter Points (Max 100)"
            className={style["form-control"]}
            name="p5Points"
            onChange={inputChangeHandler}
            value={state.p5Points}
          />
        </div>
        <div className={style["form-group"]}>
          <label>P5 Balance</label>
          <input
            type="text"
            placeholder="Current P5 Balance"
            className={style["form-control"]}
            readOnly
            name="p5Balance"
            value={state.p5Balance} 
          />
        </div>
        <button type="submit" className={style["form-button"]}>
          Submit
        </button>
        <button
          type="button"
          className={style["form-button"]}
          onClick={() => handleClick("/user/5/rewards")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddReward;
