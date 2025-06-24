import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3000/user/signup",
        data,
        {
          withCredentials: true,
        }
      );
      let userData = response.data.user;
      setUser(userData);
      navigate("/");
    } catch (error) {
      let validatorError = error.response.data.error;
      toast.error(validatorError)
      let errorMessage = error.response.data.message;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="min-h-screen bg-green-50 flex flex-col p-2 items-center justify-center">
      <NavLink to="/">
        <div className="text-3xl font-bold mb-8 text-center text-green-900">
          &lt;<span className="text-green-600">Pass</span>OP/&gt;
          <p className="text-sm font-medium text-gray-700 mt-1">
            Create your secure password manager account
          </p>
        </div>
      </NavLink>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-green-300">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Username"
            value={data.username}
            onChange={handleChange}
            name="username"
            className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            value={data.email}
            onChange={handleChange}
            name="email"
            className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={data.password}
            onChange={handleChange}
            name="password"
            className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Signup;
