import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useUserContext } from "./context/user";
import { usePollsContext } from "./context/polls";
import PollsList from "./components/PollsList";
import PollsListInactive from "./components/PollsListInactve";
import NewPoll from "./components/NewPoll";
import Login from "./components/auth/Login";
import User from "./components/user/User";

const App = () => {
  const { user, checkLoggedIn } = useUserContext();
  const { submitted, setSubmitted, getAllPolls } = usePollsContext();
  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);
  return (
    <Router>
      <nav>
        <Link onClick={getAllPolls} to="/">
          See All
        </Link>
        {user && (
          <Link onClick={() => setSubmitted(false)} to="/create">
            Create Survey
          </Link>
        )}
        {user ? (
          <Link to="/profile">My Profile{!user && <Redirect to="/" />}</Link>
        ) : (
          <Link to="/login">
            Login or New User {user && <Redirect to="/" />}
          </Link>
        )}
      </nav>
      <h1>PollBuddy</h1>
      <p className="welcome">
        {user ? `Welcome, ${user.name}` : "Please log in!"}
      </p>
      <main>
        <div className="container">
          <Route path="/" exact>
            {user ? <PollsList /> : <PollsListInactive />}
          </Route>
          <Route path="/create">
            <NewPoll />
            {submitted && <Redirect to="/" />}
          </Route>
          <Route path="/login">
            <Login />
            {user && <Redirect to="/" />}
          </Route>
          <Route path="/profile">
            <User></User>
            {!user && <Redirect to="/" />}
          </Route>
        </div>
      </main>
    </Router>
  );
};

export default App;
