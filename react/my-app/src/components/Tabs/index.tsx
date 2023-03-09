import style from "./tabs.module.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function Tabs() {
  const tab = useAppSelector((state) => state.posts.tabs);

  return (
    <nav className={style.nav}>
      <ul className={style.tabs}>
        <li className={style.tab}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${"tab_link"} ${style.active}` : "tab_link"
            }
          >
            {tab.all}
          </NavLink>
        </li>
        <li className={style.tab}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? `${"tab_link"} ${style.active}` : "tab_link"
            }
          >
            {tab.myFavorites}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;
