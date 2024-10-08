import logo from "./logo.svg";
import "./App.css";
import "../src/pages/allpages.module.css";
import UsersList from "./pages/usersList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/addUser";
import PfiveList from "./pages/pfiveList";
import RewardsList from "./pages/rewardsList";
import AddReward from "./pages/addReward";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/new" element={<AddUser />} />
          <Route path="/:id/p5" element={<PfiveList />} />
          <Route path="/:id/rewards" element={<RewardsList />} />
          <Route path="/:id/rewards/new" element={<AddReward />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
