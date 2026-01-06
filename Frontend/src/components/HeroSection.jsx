import React, { useContext, useState } from "react";
import Table from "./Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PasswordContext } from "../store/PasswordContext";
import { UserContext } from "../store/UserContext";

function HeroSection() {
  const { password, setPassword } = useContext(PasswordContext);
  const { user } = useContext(UserContext);

  const [data, setData] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleData = async () => {
    try {
      if (!user || !user.username) {
        toast.error("User not logged in!");
        return;
      }
      data.username = user.username;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/password`,
        data,
        { withCredentials: true }
      );
      const passwordData = response.data;
      setPassword((prev) => [...prev, passwordData]);
      setData({ url: "", username: "", password: "" });
      toast.success("Password Saved!!", { autoClose: 2000 });
    } catch (error) {
      let errorMessage = error.response.data.message;
      toast.error(errorMessage, { autoClose: 2500 });
    }
  };

  const handleShowButton = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full px-4  relative md:max-w-4xl mx-auto mt-4 justify-start items-center max-h-screen">
        <div className="logo flex flex-col items-center">
          <span className="text-green-600 font-bold text-2xl">
            &lt;<span className="text-black ">Pass</span>OP/&gt;
          </span>
          <p>Your own Password Manager</p>
        </div>
        <div className="search grid grid-rows-1 w-full gap-5 md:gap-7 mt-4">
          <div className="input w-full">
            <input
              type="text"
              placeholder="Enter Website Url"
              value={data.url || ""}
              name="url"
              onChange={handleChange}
              className="border w-full rounded-full px-3 py-1  border-green-500 outline-green-500 "
            />
          </div>
          <div className="input flex  md:flex-row-reverse flex-col md:gap-2 gap-5  relative ">
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
              value={user?.username || data?.username}
              className="border w-full  md:w-[30%] rounded-full px-3 py-1 border-green-500 outline-green-500 "
            />
            <div className="relative md:w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
                value={data.password || ""}
                className="border w-full  md:w-full  rounded-full pl-3 pr-2 py-1 border-green-500  outline-green-500"
              />
              <div
                className="icons absolute right-0  -translate-x-2  -translate-y-7 cursor-pointer"
                onClick={handleShowButton}
              >
                {!show ? (
                  <i className="ri-eye-line"></i>
                ) : (
                  <i className="ri-eye-off-line"></i>
                )}
              </div>
            </div>
          </div>
          <div className="button w-full  flex justify-center">
            <div
              className="border border-green-400 cursor-pointer hover:bg-green-400 py-1 flex items-center gap-2 bg-green-500 px-3 rounded-full"
              onClick={handleData}
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
                className="text-xl"
              ></lord-icon>
              <button type="submit" className="cursor-pointer">
                Save Password
              </button>
            </div>
          </div>
        </div>

        <Table />
      </div>
    </>
  );
}

export default HeroSection;
