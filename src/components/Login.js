import { useState } from "react";

const Login = ({ user, logOut, createUser, findUser }) => {
  const [isNewUser, setIsNewUser] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [nameConfirm, setNameConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      if (nameInput !== nameConfirm) {
        alert("Make sure your names match");
        return;
      }
      createUser({ name: nameInput });
    } else {
      findUser(nameInput);
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
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
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
          <button onClick={handleSubmit}>
            {isNewUser ? "Create Account" : "Log in"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
