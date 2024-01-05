import { createAction } from "@reduxjs/toolkit";
import { User } from "./userInterface";
import { AuthActionTypes } from "../enums/actionTypes";

export const loginUser = createAction<User>(AuthActionTypes.LOGIN);
export const logoutUser = createAction(AuthActionTypes.LOGOUT);
