import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url } from "./api";

interface DecodedJwt {
  id: number;
  name: string;
  email: string;
  username: string;
  profile_picture?: string;
  country?: string;
  sex?: string;
  hobbies?: string;
  iat?: number;
  exp?: number;
}

interface AuthState {
  token: string | null;
  name: string;
  email: string;
  username: string
  id: number | null;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;
  getUserStatus: string;
  getUserError: string;
}

const initialState: AuthState = {
  token: null,
  name: "",
  email: "",
  username: "",
  id: null,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  getUserStatus: "",
  getUserError: "",
};

interface ILoginForm {
  email: string;
  password: string;
}

interface IRegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
  country?: string;
  sex?: string;
  hobbies?: string;
}

export const registerUser = createAsyncThunk<
  string,
  IRegisterForm,
  { rejectValue: SerializedError }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const token = await axios.post(`${url}/users/register`, {
      name: credentials.name,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      country: credentials.country,
      sex: credentials.sex,
      hobbies: credentials.hobbies,
    });
    console.log(token.data.user);
    return token.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk<
  string,
  ILoginForm,
  { rejectValue: SerializedError }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user:DecodedJwt = jwtDecode(token);
        return {
          ...state,
          token,
          user,
          userLoaded: true,
        };
      } else {
        return {
          ...state,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        id: null,
        isAdmin: false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        registerStatus: "pending",
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: `${action.payload}`,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: DecodedJwt = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: `${user.name}`,
          email: `${user.email}`,
          id: user.id,
          username: user.username,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: `${action.payload}`,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
