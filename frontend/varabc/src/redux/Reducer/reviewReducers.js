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
    toggleReadability(state) {
      state.readability = !state.readability;
    },
    toggleNaming(state){
      state.naming = !state.naming;
    },
    toggleSpeed(state){
      state.speed = !state.speed;
    },
    toggleCommunication(state){
      state.communication = !state.communication;
    },
  },
});

export const { toggleReadability, toggleNaming, toggleSpeed, toggleCommunication } = reviewSlice.actions;
export default reviewSlice.reducer;