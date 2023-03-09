import BigCard from "../../components/BigCard";
import styles from "./singlePage.module.scss";
import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchPostById } from "../../appSlices/postsSlice";

const SinglePage: React.FC = () => {
  const { id } = useParams();
  const post = useAppSelector((state) => state.posts.post);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  return (
    <section className={styles.sectionSinglePage}>
      <div className="page_container">
        <div className={styles.wrap}>
          {post && (
            <>
              <BigCard {...post} />
              <Link to={`/posts/${id}`}></Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default SinglePage;
