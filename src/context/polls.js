import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./user";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
let API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const pollsContext = createContext();

export const PollsContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const [polls, setPolls] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchPolls = async () => {
    const res = await fetch(`${API_URL}/polls`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getPolls = async () => {
      const pollsFromServer = await fetchPolls();
      setPolls(pollsFromServer);
    };
    getPolls();
  }, []);

  const getAllPolls = async () => {
    const allPolls = await fetchPolls();
    setPolls(allPolls);
  };

  const handleVote = async (choice, pollId) => {
    axios
      .post(`${API_URL}/polls/vote/`, { choice, pollId, user })
      .then(({ data }) => {
        setPolls((prevValue) => {
          let polls = [...prevValue];
          let targetIndex = polls.findIndex((poll) => poll._id === pollId);
          polls[targetIndex] = data;
          return polls;
        });
      });
  };

  const handleCreate = (pollData) => {
    axios.post(`${API_URL}/polls/add`, pollData).then((res) => {
      pollData._id = res.data;
      setPolls([...polls, pollData]);
    });
    setSubmitted(true);
  };

  const getAllByUser = (userId) => {
    axios
      .get(`${API_URL}/polls/getall/${userId}`)
      .then((res) => setPolls(res.data));
  };

  return (
    <pollsContext.Provider
      value={{
        polls,
        setPolls,
        handleVote,
        getAllPolls,
        handleCreate,
        submitted,
        setSubmitted,
        getAllByUser,
      }}
    >
      {children}
    </pollsContext.Provider>
  );
};

export const usePollsContext = () => {
  return useContext(pollsContext);
};
