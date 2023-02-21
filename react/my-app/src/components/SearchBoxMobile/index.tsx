import { Dispatch, SetStateAction, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./search.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { fetchSearchTerm } from "../../appSlices/SearchTermSlice";
import { useEffect, useRef } from "react";

interface SearchBoxProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isShows: boolean;
  setisShows: Dispatch<SetStateAction<boolean>>;
  SearchTerm: string;
}

const Search: FC<SearchBoxProps> = (props) => {
  const { setSearchTerm, setisShows, isShows, SearchTerm } = props;
  const dispatch = useAppDispatch();
  const inputSearch = useRef<any>(null);

  useEffect(() => {
    if (isShows) {
      inputSearch.current.focus();
    }
  }, [isShows]);

  const toggleEditing = (e: any) => {
    setisShows(!isShows);
  };

  useEffect(() => {
    dispatch(fetchSearchTerm(SearchTerm));
  }, [SearchTerm, dispatch]);

  const searchWithDebounce = useDebounce((e: any) => {
    setSearchTerm(e.target.value);
  }, 1000);

  return (
    <>
      <div className={style.inputWrap}>
        <input
          className={style.inputsearch}
          ref={inputSearch}
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            searchWithDebounce(e);
          }}
        />
        <button className="menuSearch" onClick={toggleEditing}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </>
  );
};
const useDebounce = (func: any, milliseconds: number) => {
  const time = milliseconds || 400;
  let timer: any;

  return (value: any) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, value);
  };
};

export default Search;
