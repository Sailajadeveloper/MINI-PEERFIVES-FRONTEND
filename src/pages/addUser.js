import React, { useEffect, useState } from "react";
import style from "./allpages.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { get, post, put } from "../services/apiservices";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const Id = useQuery().get("id");
  const [state, setState] = useState({
    user_name: "",
  });

  const handleClick = (path) => {
    navigate(path);
  };

  const inputChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const AddHandler = async (e) => {
    e.preventDefault();
    let payload = {
      user_name: state.user_name,
    };
    try {
      const res = await post("createUser", payload);
      //(res);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await get(`userList?id=${Id}`);
      setState({
        ...state,
        user_name: res?.result?.data?.user_name,
        p5_balance: res?.result?.data?.p5_balance,
        reward_balance: res?.result?.data?.reward_balance,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const editHandler = async (e) => {
    e.preventDefault();
    let payload = {
      user_name: state.user_name,
    };
    const res = await put(`editUser/${Id}`, payload);
    if (res?.result?.status === true) {
      toast.success(res?.result?.message);
    } else toast.success(res?.result?.message);

    //(res, "===res");
    navigate("/");
  };
  useEffect(() => {
    fetchData();
  }, []);

  //(Id,"==Id")
  return (
    <div className={style["form-container"]}>
      <form onSubmit={Id && Id !== null ? editHandler : AddHandler}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            placeholder="Enter User Name"
            className={style["form-control"]}
            onChange={inputChangeHandler}
            name="user_name"
            value={state.user_name}
          />
        </div>
        <button
          type="button"
          className={style["form-button"]}
          onClick={() => handleClick(`/${Id}/p5`)}
          title={state.p5_balance}
        >
          P5 Balance
        </button>
        <button
          type="button"
          className={style["form-button"]}
          onClick={() => handleClick(`/${Id}/rewards`)}
          title={state.reward_balance}
        >
          Reward Balance
        </button>
        <button type="submit" className={style["form-button"]}>
          Save
        </button>
        <button
          type="button"
          className={style["form-button"]}
          onClick={() => handleClick("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddUser;
