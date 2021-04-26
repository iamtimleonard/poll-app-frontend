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

  const handleChangeVote = (id) => {
    axios
      .post(`${API_URL}/polls/vote/change`, { pollId: id, userId: user._id })
      .then((res) =>
        setPolls((prevPolls) => {
          return prevPolls.map((poll) => {
            if (id === poll._id) {
              poll = { ...res.data };
            }
            return poll;
          });
        })
      );
  };

  const deletePoll = async (id) => {
    try {
      const { data } = await axios.post(`${API_URL}/polls/delete/${id}`);
      setPolls(polls.filter((poll) => poll.id !== data._id));
    } catch (err) {
      alert(`Error: ${err}`);
    }
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
        handleChangeVote,
        deletePoll,
      }}
    >
      {children}
    </pollsContext.Provider>
  );
};

export const usePollsContext = () => {
  return useContext(pollsContext);
};
