
import styles from "./logOut.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../appSlices/SignInSlice";
const LogoutLink: React.FC = () => {
  const dispatch = useAppDispatch();
  

  return (
    <div className={styles.wrap}>
      <div className={styles.link} onClick={() => dispatch(logout())}>
        <span className="logOut">Logout</span>
      </div>
    </div>
  );
};

export default LogoutLink;
