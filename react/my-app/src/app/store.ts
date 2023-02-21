import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../appSlices/postsSlice";
import SerchTermReducer from "../appSlices/SearchTermSlice";
import ThemeReducer from "../appSlices/ThemeSlice";
import SignInReducer from "../appSlices/SignInSlice";
import filteredPostsReducer from "../appSlices/filterSlice";
import SignUpReducer from "../appSlices/SignUpSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    searchTerm: SerchTermReducer,
    Theme: ThemeReducer,
    User: SignInReducer,
    Registration: SignUpReducer,
    filterPosts: filteredPostsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

