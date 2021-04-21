import axios from "axios";
import dotenv from "dotenv";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useUserContext } from "./context/user";
import PollsList from "./components/PollsList";
import NewPoll from "./components/NewPoll";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
dotenv.config();

let API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const App = () => {
  const { user } = useUserContext();
  const [polls, setPolls] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  // const [user, setUser] = useState("");
  useEffect(() => {
    const getPolls = async () => {
      const pollsFromServer = await fetchPolls();
      setPolls(pollsFromServer);
    };
    getPolls();
  }, []);

  const fetchPolls = async () => {
    const res = await fetch(`${API_URL}/polls`);
    const data = await res.json();
    return data;
  };

  const handleVote = async (choice, pollId) => {
    axios
      .get(`${API_URL}/polls/${pollId}`)
      .then(({ data }) => {
        data.options.forEach((option) => {
          option.id === choice && option.votes++;
        });
        return data;
      })
      .then((res) => {
        axios.post(`${API_URL}/polls/vote/${pollId}`, res).then(() => {
          axios.get(`${API_URL}/polls`).then(({ data }) => {
            setPolls(data);
          });
        });
      });

    // axios
    //   .get(`${API_URL}/users/${user._id}`)
    //   .then(({ data }) => {
    //     data.voted.push(pollId);
    //     return data;
    //   })
    //   .then((data) => {
    //     setUser(data);
    //     axios.post(`${API_URL}/users/vote/${data._id}`, data);
    //   });
  };

  // const createUser = (userData) => {
  //   axios.post(`${API_URL}/users/add`, userData).then((res) => {
  //     setUser(res.data);
  //   });
  // };

  // const findUser = (name) => {
  //   axios.post(`${API_URL}/users/login`, { name }).then(({ data }) => {
  //     if (!data) {
  //       return alert("User not found, please try again");
  //     }
  //     setUser(data);
  //   });
  // };

  const handleCreate = (pollData) => {
    axios.post(`${API_URL}/polls/add`, pollData).then((res) => {
      pollData._id = res.data;
      setPolls([...polls, pollData]);
    });
    setSubmitted(true);
  };

  // const logOut = () => {
  //   setUser("");
  // };

  return (
    <Router>
      <nav>
        <Link to="/">See All</Link>
        {user && (
          <Link onClick={() => setSubmitted(false)} to="/create">
            Create Survey
          </Link>
        )}
        <Link to="/login">
          {!user ? "Login or New User" : "Logout"} {user && <Redirect to="/" />}
        </Link>
      </nav>
      <h1>PollBuddy</h1>
      <p>{user ? `Welcome, ${user.name}` : "Please log in!"}</p>
      <main>
        <div className="container">
          <Route path="/" exact>
            {user && <PollsList polls={polls} handleVote={handleVote} />}
          </Route>
          <Route path="/create">
            <NewPoll user={user} handleCreate={handleCreate} />
            {submitted && <Redirect to="/" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Logout />}</Route>
        </div>
      </main>
    </Router>
  );
};

export default App;
