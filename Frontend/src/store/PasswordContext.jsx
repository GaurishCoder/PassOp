import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PasswordContext = createContext({
  password: [],
  setPassword: () => {},
});

const PasswordContextProvider = ({ children }) => {
  const [password, setPassword] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
          {
            withCredentials: true,
          }
        );
        let data = response.data.password;
        data.map((items) => setPassword((prev) => [...prev, items]));
      } catch (err) {
        setPassword({});
      }
    };
    fetchUser();
  }, []);

  return (
    <PasswordContext.Provider value={{ password, setPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
