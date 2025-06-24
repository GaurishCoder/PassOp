import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/user/logout",
      {},
      { withCredentials: true }
    );
    navigate("/user/login");
    toast.success("Successfully Logout!");
  };
  return (
    <div className="bg-gray-900 p-2">
      <nav className="w-full md:max-w-5xl mx-auto flex justify-between items-center ">
        <div className="logo">
          <span className="text-green-600 font-bold text-2xl">
            &lt;<span className="text-white ">Pass</span>OP/&gt;
          </span>
        </div>
        <div className="gitlogo">
          <div className="border flex items-center py-1 justify-center bg-green-700 gap-1 px-3 border-white rounded-lg">
            <div className="icon flex">
              <i className="ri-key-2-line font-semibold text-base text-white"></i>
            </div>
            {user?.username ? (
              <p className="text-md font-bold text-white ">
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </p>
            ) : (
              <p className="text-md font-bold text-white ">
                <NavLink to="/user/login">Login</NavLink>
              </p>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
