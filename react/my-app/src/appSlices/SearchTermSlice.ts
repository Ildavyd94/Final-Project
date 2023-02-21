/* eslint-disable no-empty-pattern */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type SearchState = {
  search: any[];
};

const initialState: SearchState = {
  search: [],
};

export const fetchSearchTerm = createAsyncThunk(
  "search/SearchPost",
  async (searchTerm: string | undefined, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:3000/posts?title_like=${searchTerm}`
    );

    if (!response.ok) {
      return rejectWithValue("error in Search");
    }
    const json = await response.json();
    return json;
  }
);

export const SearchTermSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchTerm.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.search = action.payload;
        console.log(action.payload);
      }
    );
    builder.addCase(fetchSearchTerm.pending, (state, action) => {
      console.log("PENDING");
    });
    builder.addCase(fetchSearchTerm.rejected, (state, action) => {
      console.log("Error Search");
    });
  },
});

export const {} = SearchTermSlice.actions;
export default SearchTermSlice.reducer;
