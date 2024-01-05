import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "../slices/authSlice";
import notesReducer from "../slices/noteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

store.subscribe(() => {
  const authState = store.getState().auth;
  localStorage.setItem("authState", JSON.stringify(authState));
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export default store;
