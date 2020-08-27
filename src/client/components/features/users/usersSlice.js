import { createSlice } from "@reduxjs/toolkit";

export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("/api/users");

  dispatch(addUsers(res.data));
};

const initialState = {
    users: [{id: 0, name: "initial"}]
};

const usersSlice = createSlice({
  name: "usersReducer",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
