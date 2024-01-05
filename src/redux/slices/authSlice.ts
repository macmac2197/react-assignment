import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../types/actions";
import { User } from "../../types/userInterface";
import { RootState } from "../store";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const loadAuthState = (): AuthState => {
  try {
    const serializedAuthState = localStorage.getItem("authState");
    if (serializedAuthState === null) {
      return { isAuthenticated: false, username: null };
    }
    return JSON.parse(serializedAuthState);
  } catch (error) {
    return { isAuthenticated: false, username: null };
  }
};

const saveAuthState = (state: AuthState): void => {
  try {
    const serializedAuthState = JSON.stringify(state);
    localStorage.setItem("authState", serializedAuthState);
  } catch (error) {
    console.log("Error", error);
  }
};

const authInitialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      saveAuthState(state);
    });
    builder.addCase(logoutUser, (state) => {
      state.isAuthenticated = false;
      state.username = null;
      saveAuthState(state);
    });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
