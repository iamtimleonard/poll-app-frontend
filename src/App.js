import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useUserContext } from "./context/user";
import { usePollsContext } from "./context/polls";
import PollsList from "./components/PollsList";
import NewPoll from "./components/NewPoll";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

const App = () => {
  const { user } = useUserContext();
  const { submitted, setSubmitted, getAllPolls } = usePollsContext();

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
        <Link to="/login">
          {!user ? "Login or New User" : "Logout"} {user && <Redirect to="/" />}
        </Link>
      </nav>
      <h1>PollBuddy</h1>
      <p className="welcome">
        {user ? `Welcome, ${user.name}` : "Please log in!"}
      </p>
      <main>
        <div className="container">
          <Route path="/" exact>
            {user && <PollsList />}
          </Route>
          <Route path="/create">
            <NewPoll />
            {submitted && <Redirect to="/" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Logout />}</Route>
        </div>
      </main>
    </Router>
  );
};

export default App;
