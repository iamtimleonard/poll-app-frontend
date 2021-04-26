import { useUserContext } from "../../context/user";
import Logout from "../auth/Logout";

const User = () => {
  const { user, deleteUser } = useUserContext();
  const joinDate = new Date(user.joined).toDateString();
  return (
    <section className="profile">
      <header className="profile__header">
        <h1>{`${user.name}'s`} Profile</h1>
        <p>Member Since: {joinDate}</p>
        <button onClick={deleteUser}>Delete Account</button>
        <Logout></Logout>
      </header>
      <div className="profile__polls"></div>
    </section>
  );
};

export default User;
