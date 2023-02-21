import { createSlice } from "@reduxjs/toolkit";

type ThemeState = boolean;

const themeFromLocalStorage = !!localStorage.getItem("posts-theme");

const initialState: ThemeState = themeFromLocalStorage;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state) {
        localStorage.removeItem("posts-theme");
      } else {
        localStorage.setItem("posts-theme", "darkTheme");
      }
      return (state = !state);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
