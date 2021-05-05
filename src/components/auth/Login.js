import { useState } from "react";
import { useUserContext } from "../../context/user";

const Login = () => {
  const { createUser, findUser } = useUserContext();
  const [isNewUser, setIsNewUser] = useState(false);

  const [name, setName] = useState("");
  const [nameConfirm, setNameConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      if (name !== nameConfirm) {
        alert("Make sure your names match");
        return;
      }
      if (password !== passwordConfirm) {
        alert("Passwords must match");
        return;
      }
      createUser({ name, password });
    } else {
      findUser({ name, password });
    }
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    setIsNewUser(!isNewUser);
  };

  return (
    <>
      <form>
        <div className="form-control">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Username"
          />
        </div>
        {isNewUser && (
          <div className="form-control">
            <input
              value={nameConfirm}
              onChange={(e) => setNameConfirm(e.target.value)}
              type="text"
              name="nameConfirm"
              placeholder="Confirm Username"
            />
          </div>
        )}
        <div className="form-control">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {isNewUser && (
          <div className="form-control">
            <input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        )}
        <div className="form-control">
          <button
            className="login__btn login--submit"
            aria-label="submit form"
            onClick={handleSubmit}
          >
            {isNewUser ? "Create Account" : "Log in"}
          </button>
          <button
            className="login__btn login--new-user"
            aria-label="toggle register or log in"
            onClick={handleNewUser}
          >
            {isNewUser ? "Returning user?" : "New User?"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
