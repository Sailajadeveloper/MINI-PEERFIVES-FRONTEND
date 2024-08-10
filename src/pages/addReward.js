import React, { useState, useEffect } from "react";
import style from "./allpages.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../services/apiservices";
import useUsersList from "../customHooks/useUsersList";
import { toast } from "react-toastify";

const AddReward = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useUsersList();

  const [currentUser, setCurrentUser] = useState(0);
  const [state, setState] = useState({
    recipient_id: "",
    user_name: "",
    p5Points: 0,
    p5Balance: 0,
  });

  // Get the current user's data and set balance
  useEffect(() => {
    if (userData.length > 0) {
      const currentUser = userData.find((user) => user.id == id);
      if (currentUser) {
        setCurrentUser(currentUser.p5_balance);
        setState((prevState) => ({
          ...prevState,
          p5Balance: currentUser.p5_balance,
        }));
      }
    }
  }, [id, userData]);

  // Filter out the current user from the userData
  const filteredUserData = userData.filter((data) => data.id != id);

  const handleClick = (path) => {
    navigate(path);
  };

  const AddHandler = async (e) => {
    e.preventDefault();
    const payload = {
      points: parseInt(state.p5Points),
      recipient_id: state.recipient_id,
      given_to_name: state.user_name, // Add given_to_name
      given_by_name: currentUser?.user_name,
    };
    try {
      //(payload, "==payload");
      const res = await post(`users/${id}/p5`, payload);
      //(res, "==res");
      if (res?.result?.status === true) {
        toast.success(res?.result?.message);
        navigate(`/${id}/p5`);
      } else toast.warning(res?.result?.message);
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });

    // Set the recipient_id and user_name based on the selected user ID
    if (name === "recipient_id") {
      const selectedUser = filteredUserData.find((user) => user.id == value);
      setState((prevState) => ({
        ...prevState,
        recipient_id: value,
        user_name: selectedUser ? selectedUser.user_name : "",
      }));
    }
  };

  return (
    <div className={style["form-container"]}>
      <form onSubmit={AddHandler}>
        <div className={style["form-group"]}>
          <label>User Dropdown</label>
          <select
            className={style["form-control"]}
            name="recipient_id"
            onChange={inputChangeHandler}
            value={state.recipient_id}
          >
            <option value="">Select a User</option>
            {filteredUserData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.user_name}
              </option>
            ))}
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
            value={state.p5Balance} // Use the balance state directly
          />
        </div>
        <button
          type="submit"
          className={style["form-button"]}
          disabled={state.recipient_id === ""}
        >
          Submit
        </button>
        <button
          type="button"
          className={style["form-button"]}
          onClick={() => handleClick(`/${id}/p5`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddReward;
