import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'Java',
  fontSize: "16",
  theme: 'monokai',
  isIdeShown: false,
  isPractice: false,
  isPlayerTurn: JSON.parse(sessionStorage.getItem('isPlayerTurn')) || null
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
    setIsPlayerTurn(state, action){
      state.isPlayerTurn = action.payload;
    },
  },
});

export const {setMode, setTheme, setFontSize, setIsIdeShown, setIsPractice, setIsPlayerTurn} = ideSlice.actions;
export default ideSlice.reducer;