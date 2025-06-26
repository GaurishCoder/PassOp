import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
          {
            withCredentials: true,
          }
        );
        let data = response.data.user;
        setUser(data);
      } catch (err) {
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
