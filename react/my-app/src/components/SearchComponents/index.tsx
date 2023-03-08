import style from "./searchComponent.module.scss";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import SmallCard from '../SmallCard';

interface SearchBoxProps {
  searchTerm: string;
}

const SearchComponents: React.FC<SearchBoxProps> = (props) => {
  const { searchTerm } = props;
  const Search = useAppSelector((state) => state.searchTerm.search);

  const searchPosts = Search.filter((movie) => {
    return movie.title.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <h2 className="search_title">Search results '{searchTerm}'</h2>
      <div className={style.wrap}>
        {searchPosts.map((post) => (
          <Link key={post.id} className={style.post} to={`posts/${post.id}`}>
            <SmallCard {...post} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchComponents;
