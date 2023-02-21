import style from "./header.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import { faUser, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/logoutLink";
import User from "../User/user";

const HeaderIcon: React.FC = () => {
  const isLogin = useAppSelector((state) => state.User.isLoggedIn);
  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <div className={style.wrapLink}>
        <Link className={style.link} to="/signIn">
          {isLogin ? (
            <div className={style.user_wrap}>
              <User />
              <div className={style.parent}>
                <button
                  className={style.button_user}
                  onClick={() => setIsClick(!isClick)}
                >
                  <FontAwesomeIcon
                    className={style.icon_down}
                    icon={faSortDown}
                  />
                </button>
                {isClick && (
                  <div className={style.wrap_user}>
                    <LogOut />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className={style.authorIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span className="AuthorName">Sign in</span>
            </>
          )}
        </Link>
      </div>
    </>
  );
};

export default HeaderIcon;
