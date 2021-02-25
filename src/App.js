import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PollsList from "./components/PollsList";
import NewPoll from "./components/NewPoll";
import axios from "axios";
import dotenv from "dotenv";
import Login from "./components/Login";
dotenv.config();

let API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const App = () => {
  const [polls, setPolls] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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
  };

  const handleCreate = (pollData) => {
    axios.post(`${API_URL}/polls/add`, pollData).then((res) => {
      pollData._id = res.data;
      setPolls([...polls, pollData]);
    });
    setSubmitted(true);
  };

  return (
    <Router>
      <nav>
        <Link to="/">See All</Link>
        <Link to="/create">Create Survey</Link>
        <Link to="/login">Login or Create An Account</Link>
      </nav>
      <h1>PollBuddy</h1>
      <main>
        <div className="container">
          <Route path="/" exact>
            <PollsList polls={polls} handleVote={handleVote} />
          </Route>
          <Route path="/create">
            <NewPoll handleCreate={handleCreate} />
            {submitted && <Redirect to="/" />}
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </div>
      </main>
    </Router>
  );
};

export default App;
