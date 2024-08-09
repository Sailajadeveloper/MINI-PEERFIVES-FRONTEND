import React, { useEffect, useState } from "react";
import style from "./allpages.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { get, post } from "../services/apiservices";

const AddUser = () => {
  const navigate = useNavigate();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const Id = useQuery().get('id');  
  const [state, setState] = useState({
    user_name: '',
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
      const res = await post('createUser', payload);
      console.log(res);
      navigate('/'); 
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await get(`userList?id=${Id}`);
      setState(res?.result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style['form-container']}>
      <form onSubmit={AddHandler}>
        <div>
          <label>User Name</label>
          <input 
            type="text" 
            placeholder="Enter User Name"  
            className={style['form-control']} 
            onChange={inputChangeHandler} 
            name="user_name" 
            value={state.user_name} 
          />
        </div>
        <button type="button" className={style['form-button']} onClick={() => handleClick('/user/5/p5')}>
          P5 Balance
        </button>
        <button type="button" className={style['form-button']} onClick={() => handleClick('/user/5/rewards')}>
          Reward Balance
        </button>
        <button type="submit" className={style['form-button']}>
          Save
        </button>
        <button type="button" className={style['form-button']} onClick={() => handleClick('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddUser;
