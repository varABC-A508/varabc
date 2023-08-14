import { createSlice } from "@reduxjs/toolkit";
import { setProblemData } from '../Actions/problemFormActions';

const initialState = {
  problemTitle: "",
  problemLevel: "",
  problemAlgorithmType: "000000000000",
  problemSource: "",
  problemLink: "",
  problemRestrictionTimePython: "",
  problemRestrictionTimeJava: "",
  problemRestrictionMemory: "",
  problemContent: "",
  problemInputContent: "",
  problemOutputContent: "",
  imageURLs: [],
  problemUpdate: false, 
  problemContentUpdate: false, 
  testCaseUpdate: false,
};

const problemFormSlice = createSlice({
  name: "problemForm",
  initialState,
  reducers: {
    setProblemTitle(state, action) {
      state.problemTitle = action.payload;
    },
    setProblemLevel(state, action) {
      state.problemLevel = action.payload;
    },
    setProblemAlgorithmType(state, action) {
      state.problemAlgorithmType = action.payload;
    },
    setProblemSource(state, action) {
      state.problemSource = action.payload;
    },
    setProblemLink(state, action) {
      state.problemLink = action.payload;
    },
    setProblemRestrictionTimePython(state, action) {
      state.problemRestrictionTimePython = action.payload;
    },
    setProblemRestrictionTimeJava(state, action) {
      state.problemRestrictionTimeJava = action.payload;
    },
    setProblemRestrictionMemory(state, action) {
      state.problemRestrictionMemory = action.payload;
    },
    setProblemContent(state, action) {
      state.problemContent = action.payload;
    },
    setProblemInputContent(state, action) {
      state.problemInputContent = action.payload;
    },
    setProblemOutputContent(state, action) {
      state.problemOutputContent = action.payload;
    },
    setImageURLs(state, action) {
      state.imageURLs = action.payload;
    },
    setProblemUpdate(state, action) {
      state.problemUpdate = action.payload;
    },
    setProblemContentUpdate(state, action) {
      state.problemContentUpdate = action.payload;
    },
    setTestCaseUpdate(state, action) {
      state.testCaseUpdate = action.payload;
    },

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

export const {
  setProblemTitle,
  setProblemLevel,
  setProblemAlgorithmType,
  setProblemSource,
  setProblemLink,
  setProblemRestrictionTimePython,
  setProblemRestrictionTimeJava,
  setProblemRestrictionMemory,
  setProblemContent,
  setProblemInputContent,
  setProblemOutputContent,
  setImageURLs,
  setProblemUpdate,
  setProblemContentUpdate,
  setTestCaseUpdate,
} = problemFormSlice.actions;
export default problemFormSlice.reducer;
