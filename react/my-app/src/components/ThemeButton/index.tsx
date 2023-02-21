import style from "./ThemeButton.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { toggleTheme } from "../../appSlices/ThemeSlice";

function ThemeButton() {
  const isNight = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  const onToggle = () => dispatch(toggleTheme());

  return (
    <>
      <div className={style.wrap}>
        <span className="switchTheme"> Dark theme</span>
        <div
          className={
            isNight ? `${style.checkbox} ${style.active}` : style.checkbox
          }
          onClick={onToggle}
        >
          <div
            className={
              isNight ? `${style.circle} ${style.active}` : style.circle
            }
          ></div>
        </div>
      </div>
    </>
  );
}

export default ThemeButton;
