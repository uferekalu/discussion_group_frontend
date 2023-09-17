import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url } from "./api";
import { AuthState, DecodedJwt } from "@/utils/interface";

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
  { rejectValue: any }
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk<
  string,
  ILoginForm,
  { rejectValue: any }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state) {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");

      if (!token) {
        // Token is not present, user is not logged in
        return {
          ...state,
          token: null,
          name: "",
          email: "",
          username: "",
          id: null,
          userLoaded: true,
        };
      }

      const decodedToken: DecodedJwt = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired, log the user out
        typeof window !== "undefined" && localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          name: "",
          email: "",
          username: "",
          id: null,
          userLoaded: true,
        };
      }
      return {
        ...state,
        token,
        user: decodedToken,
        userLoaded: true,
      };
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
        registerStatus: "rejected",
        registerError: `${action.payload.error}`,
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
        loginError: `${action.payload.error}`,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
