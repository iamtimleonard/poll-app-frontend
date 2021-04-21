import React from "react";
import { useUserContext } from "../../context/user";

const Logout = () => {
  const { logOut } = useUserContext();
  return (
    <>
      <button onClick={logOut}>Logout</button>
    </>
  );
};

export default Logout;
