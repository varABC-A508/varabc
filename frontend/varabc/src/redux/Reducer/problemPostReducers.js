import { createSlice } from '@reduxjs/toolkit';
import { setProblemData } from '../Actions/problemPostActions'; // Adjust the path as needed

const initialState = {
  problemNo: 0,
  problemTitle: "",
  problemLevel: "",
  problemSubmitCount: 0,
  problemCorrectCount: 0,
  problemAlgorithmType: "11",
  problemSource: "",
  problemLink: "",
  problemRestrictionPython: 0,
  problemRestrictionJava: 0,
  problemRestrictionMemory: 0,
  problemContent: "",
  problemInputContent: "",
  problemOutputContent: "",
  problemImageS3Url: [],
  testCaseInputPublicList: [],
  testCaseOutputPublicList: [],
  testCaseInputPrivateList: [],
  testCaseOutputPrivateList: [],
};

const problemPostSlice = createSlice({
  name: 'problemPost',
  initialState,
  reducers: {
    // ...other reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(setProblemData, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export default problemPostSlice.reducer;
