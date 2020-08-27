import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./components/features/users/usersSlice";
import adminsReducer from "./components/features/admins/adminsSlice";
import authReducer from "./components/features/auth/authSlice";

const rootReducer = combineReducers({
  usersReducer,
  adminsReducer,
  authReducer,
});

export default rootReducer;
