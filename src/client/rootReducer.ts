import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import adminsReducer from "./features/admins/adminsSlice";
import authReducer from "./features/auth/authSlice";

const rootReducer = combineReducers({
  usersReducer,
  adminsReducer,
  authReducer,
});

export default rootReducer;
