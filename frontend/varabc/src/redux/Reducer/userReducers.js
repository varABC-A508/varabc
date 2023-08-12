import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: localStorage.getItem('nickname') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNickname(state, action) {
      console.log("Before state:", state); // 현재 상태를 로그로 출력
      state.nickname = action.payload;
      console.log("After state:", state); // 업데이트된 상태를 로그로 출력
    },
  },
});

export const { setNickname } = userSlice.actions;
export default userSlice.reducer;