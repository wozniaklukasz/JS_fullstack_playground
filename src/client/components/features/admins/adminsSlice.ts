import { createSlice } from "@reduxjs/toolkit";

export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get("/api/users");

  dispatch(addAdmins(res.data));
};

const initialState = {
    admins: [{id: 0, name: "initial"}]
};

const adminsSlice = createSlice({
  name: "adminsReducer",
  initialState,
  reducers: {
    addAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { addAdmins } = adminsSlice.actions;

export default adminsSlice.reducer;
