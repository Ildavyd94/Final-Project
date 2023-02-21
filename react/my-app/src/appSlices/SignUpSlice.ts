import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface IRegistration {
  username: string;
  email: string;
  password: string;
}
export interface IToken {
  uid: string;
  token: string;
}

interface IRegistrationState {
  errorMessage: string | undefined;
  isToken: boolean;
  isSuccess: boolean;
}

const initialState: IRegistrationState = {
  errorMessage: "",
  isToken: false,
  isSuccess: false,
};

export const fetchRegister = createAsyncThunk<
  undefined,
  IRegistration,
  { rejectValue: string }
>("user/register", async (user, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/`,
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
      throw new Error(
        "Сheck your password and email, maybe you are already registered? "
      );
    }
    const json = await response.json();
    return json;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchActivate = createAsyncThunk<
  undefined,
  IToken,
  { rejectValue: string }
>("user/activate", async (token, thunkAPI) => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/auth/users/activation/`,
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
      throw new Error("Server Error activation");
    }
    const json = await response.json();
    return json;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    changeIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    changeErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.isToken = true;
      state.errorMessage = "";
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.isToken = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchActivate.fulfilled, (state, action) => {
      state.isToken = false;
      state.isSuccess = true;
      state.errorMessage = "";
    });
    builder.addCase(fetchActivate.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export const { changeIsSuccess, changeErrorMessage } =
  registrationSlice.actions;

export default registrationSlice.reducer;
