import { useUserContext } from "../../context/user";

const Logout = () => {
  const { logOut } = useUserContext();
  return (
    <>
      <button className="login__btn" onClick={logOut}>
        Logout
      </button>
    </>
  );
};

export default Logout;
