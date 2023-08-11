import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: true,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = adminSlice.actions;
export default adminSlice.reducer;
