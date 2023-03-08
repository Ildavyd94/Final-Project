import { useAppSelector, useAppDispatch } from "../../app/hooks";
import style from "./home.module.scss";
import Posts from '../../components/Posts';
import SearchComponents from "../../components/SearchComponents";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { Route, Routes } from "react-router-dom";
import Favorites from "../../components/Favourites";
import { setCurrentPage } from "../../appSlices/filterSlice";

interface ISearchProps {
  isShows: boolean;
  searchTerm: string;
}

const Home: React.FC<ISearchProps> = (props) => {
  const { currentPage: page } = useAppSelector((state) => state.filterPosts);
  const dispatch = useAppDispatch();

  const { isShows, searchTerm } = props;

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <section className={style.sectionPosts}>
        <div className="container">
          {isShows ? (
            <>
              <SearchComponents searchTerm={searchTerm} />
            </>
          ) : (
            <>
              <h1 className="MainTitle">My Blog</h1>
              <Tabs />
              <Routes>
                <Route index path="/*" element={<Posts />} />
                <Route path="/favourites" element={<Favorites />} />
              </Routes>
              <Pagination currentPage={page} onChangePage={onChangePage} />
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Home;
