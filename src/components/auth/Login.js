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
      createUser({ name, password });
    } else {
      findUser({ name, password });
    }
  };

  return (
    <>
      <button onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? "Returning user?" : "New User?"}
      </button>
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
              name="passwordConfirm"
              placeholder="Confirm Password"
            />
          </div>
        )}
        <div className="form-control">
          <button onClick={handleSubmit}>
            {isNewUser ? "Create Account" : "Log in"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
