import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface IUserTokens {
  access: string;
  refresh: string;
}
interface IUserData {
  username?: string;
  id?: number;
  email?: string;
}

interface IUserState {
  userData: IUserData;
  accessToken: string;
  isLoggedIn: boolean;
  successMessage: string;
}

const initialState: IUserState = {
  userData: {},
  accessToken: "",
  isLoggedIn: false,
  successMessage: "",
};

export interface IUserParams {
  email: string;
  password: string;
}

// type UserState = {
//   user: null | any; //переделать
//   accessToken: string;
//   isLoggedIn: boolean;
// };
// const initialState: UserState = {
//   user: null,
//   accessToken: "token",
//   isLoggedIn: false,
// };

export const fetchLogin = createAsyncThunk<
  IUserTokens,
  IUserParams,
  { rejectValue: string }
>("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/jwt/create/`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error("Сheck your username and password");
    }

    const json = await response.json();
    return json;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const isLogin = createAsyncThunk<
  IUserData,
  string,
  { rejectValue: string }
>("user/isLogin", async (accessToken, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/me/`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok === false) {
      throw new Error("Server Error isLogin");
    }

    const json = await response.json();
    return json;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchRefresh = createAsyncThunk<
  { access: string },
  { refresh: string },
  { rejectValue: string }
>(
  "user/refresh", // имя
  async (token, thunkAPI) => {
    //функция котрая делает запрос
    try {
      const response = await fetch(
        `https://studapi.teachmeskills.by/auth/jwt/refresh/`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token),
        }
      );
      if (!response.ok) {
        throw new Error("Unnable");
      }

      const json = await response.json();
      return json;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.userData = {};
      state.accessToken = "";
      localStorage.removeItem("user");
      state.isLoggedIn = false;
    },
    changeSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoggedIn = true;
      state.accessToken = action.payload.access;
    });
    builder.addCase(fetchRefresh.fulfilled, (state, action) => {
      state.accessToken = action.payload.access;
      const user = JSON.parse(localStorage.getItem("user") || "");
      user.access = state.accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      state.isLoggedIn = true;
    });
    builder.addCase(isLogin.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      alert(action.payload);
      state.isLoggedIn = false;
    });
    builder.addCase(isLogin.rejected, (state, action) => {
      state.userData = {};
      state.isLoggedIn = false;
    });
    builder.addCase(fetchRefresh.rejected, (state, action) => {
      state.accessToken = "";
      state.isLoggedIn = false;
    });
  },
});

export const { logout, changeSuccessMessage } = userSlice.actions;
export default userSlice.reducer;