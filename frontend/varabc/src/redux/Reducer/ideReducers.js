import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'java',
  fontSize: "16",
  theme: 'monokai',
  isIdeShown: false,
  isPractice: false,
};

const ideSlice = createSlice({
  name: 'ide',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
    setTheme(state, action){
      state.theme = action.payload;
    },
    setFontSize(state, action){
      state.fontSize = action.payload;
    },
    setIsIdeShown(state, action){
      state.isIdeShown = action.payload;
    },
    setIsPractice(state, action){
      state.isPractice = action.payload;
    },
  },
});

export const {setMode, setTheme, setFontSize, setIsIdeShown, setIsPractice} = ideSlice.actions;
export default ideSlice.reducer;