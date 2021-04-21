import { useState, useContext, createContext } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const createUser = (userData) => {
    axios.post(`${API_URL}/users/add`, { userData }).then((res) => {
      setUser(res.data);
    });
  };

  const findUser = (name) => {
    axios.post(`${API_URL}/users/login`, { name }).then(({ data }) => {
      if (!data) {
        return alert("User not found, please try again");
      }
      setUser(data);
    });
  };

  const logOut = () => {
    setUser("");
  };
  return (
    <userContext.Provider value={{ user, createUser, findUser, logOut }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
