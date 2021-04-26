import React from "react";
import { useUserContext } from "../../context/user";
import Logout from "../auth/Logout";

const User = () => {
  const { user } = useUserContext();
  return (
    <div className="profile">
      <h1>{`${user.name}'s`} Profile</h1>
      <Logout></Logout>
    </div>
  );
};

export default User;
