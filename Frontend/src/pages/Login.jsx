import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
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
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        data,
        {
          withCredentials: true,
        }
      );
      let userData = response;
      setUser(userData);
      toast.success("You are LoggedIn!");
      navigate("/");
    } catch (error) {
      let errorMessage = error.response.data.message;
      console.log(errorMessage);
      toast.error(errorMessage, { autoClose: 2000 });
    }
  };
  return (
    <div className="min-h-screen bg-green-50 flex p-2 flex-col items-center justify-center">
      <NavLink to="/">
        <div className="text-3xl font-bold mb-8 text-center text-green-900">
          &lt;<span className="text-green-600">Pass</span>OP/&gt;
          <p className="text-sm font-medium text-gray-700 mt-1">
            Login to access your password vault
          </p>
        </div>
      </NavLink>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-green-300">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Username"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/user/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            Sign up
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

export default Login;
