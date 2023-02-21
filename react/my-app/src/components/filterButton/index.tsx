import React from "react";
import style from "./filterButton.module.scss";
import { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
interface categoryProps {
  value: number;
  onClickCategory: Dispatch<SetStateAction<any>>;
}

const FilterButton: React.FC<categoryProps> = ({ value, onClickCategory }) => {
  const categories = ["without filter", "day", "month", "year"];
  const [isShows, setisShows] = useState(false);

  return (
    <>
      <ul className={style.wrap_filter}>
        {categories.map((category, i) => (
          <div className={style.filter_link} key={i}>
            <li
              onClick={() => onClickCategory(i)}
              className={
                value === i
                  ? `${"filter_button"} ${style.active}`
                  : "filter_button"
              }
            >
              {category}
            </li>
          </div>
        ))}
      </ul>
      <div className={style.burger}>
        <div className={style.wrapButton}>
          <button
            className={style.button_show}
            onClick={() => setisShows(!isShows)}
          >
            Filter
            <FontAwesomeIcon icon={faSortDown} />
          </button>
        </div>
        {isShows && (
          <ul className={style.show_menu}>
            {categories.map((category, i) => (
              <div className={style.burger_link} key={i}>
                <li
                  onClick={() => onClickCategory(i)}
                  className={
                    value === i
                      ? `${style.filter_button} ${style.active}`
                      : `${style.filter_button}`
                  }
                >
                  {category}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterButton;
