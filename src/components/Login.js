import { useState } from "react";

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <>
      <button onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? "Returning user?" : "New User?"}
      </button>
      <form>
        <div className="form-control">
          <input type="text" placeholder="Username" />
        </div>
        {isNewUser && (
          <div className="form-control">
            <input type="text" placeholder="Confirm Username" />
          </div>
        )}
        <div className="form-control">
          <button>{isNewUser ? "Create Account" : "Log in"}</button>
        </div>
      </form>
    </>
  );
};

export default Login;
