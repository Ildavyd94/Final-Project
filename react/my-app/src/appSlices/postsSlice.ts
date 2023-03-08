import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getItem } from "../utils/localStorage";

type Post = {
  date: string;
  title: string;
  description: string;
  src: string;
  category: number;
  rating: number | any;
  id: string;
};

type PostsState = {
  posts: Post[];
  favourites: Post[];
  post: null | Post;
  tabs: object | any;
};

const initialState: PostsState = {
  posts: [],
  favourites: getItem("favoutites") || [],
  post: null,
  tabs: { all: "All", myFavorites: "My Favorites" },
};

export const fetchPost = createAsyncThunk(
  "posts/Posts",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/posts`);

    if (!response.ok) {
      return rejectWithValue("Server error");
    }
    const json = await response.json();
    return json;
  }
);

export const fetchPostById = createAsyncThunk(
  "post/PostById",
  async (id: string | undefined, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`);

    if (!response.ok) {
      return rejectWithValue("error poen post");
    }

    const json = await response.json();
    return json;
  }
);

export const postsSlice = createSlice({
  name: "posts", //todos
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<any>) => {
      const post = action.payload;
      state.favourites = [...state.favourites, post];
      let tostring = JSON.stringify(state.favourites);
      localStorage.setItem("favoutites", tostring);
    },
    delitemarksFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
      let tostring = JSON.stringify(state.favourites);
      localStorage.setItem("favoutites", tostring);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export const { addFavourite, delitemarksFavourite } = postsSlice.actions;
export default postsSlice.reducer;
