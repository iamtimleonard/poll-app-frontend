import { useUserContext } from "../../context/user";
import styles from "./Login.module.css";

const Logout = () => {
  const { logOut } = useUserContext();
  return (
    <>
      <button className={styles.btn} onClick={logOut}>
        Logout
      </button>
    </>
  );
};

export default Logout;
