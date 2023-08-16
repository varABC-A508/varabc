import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readability: false,
  naming: false,
  speed: false,
  communication: false
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReadability(state, action) {
      state.readability = action.payload;
    },
    setNaming(state, action){
      state.naming = action.payload;
    },
    setSpeed(state, action){
      state.speed = action.payload;
    },
    setCommunication(state, action){
      state.communication = action.payload;
    },
  },
});

export const { setReadability, setNaming, setSpeed, setCommunication } = reviewSlice.actions;
export default reviewSlice.reducer;