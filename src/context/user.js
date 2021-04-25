import { useState, useContext, createContext } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const createUser = ({ name, password }) => {
    axios.post(`${API_URL}/users/add`, { name, password }).then((res) => {
      setUser(res.data);
    });
  };

  const findUser = ({ name, password }) => {
    axios
      .post(`${API_URL}/users/login`, { name, password })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const logOut = () => {
    axios
      .get(`${API_URL}/users/logout`)
      .then((res) => {
        console.log(res.data);
        setUser("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVoteUser = (pollId) => {
    axios
      .get(`${API_URL}/users/${user._id}`)
      .then(({ data }) => {
        data.voted.push(pollId);
        return data;
      })
      .then((data) => {
        setUser(data);
        axios.post(`${API_URL}/users/vote/${data._id}`, data);
      });
  };

  const removeVote = (pollId) => {
    setUser((prevValue) => {
      prevValue.voted.splice(prevValue.voted.indexOf(pollId), 1);
      return prevValue;
    });
  };
  return (
    <userContext.Provider
      value={{ user, createUser, findUser, logOut, handleVoteUser, removeVote }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
