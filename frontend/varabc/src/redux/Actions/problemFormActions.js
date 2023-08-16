// Problem Info

import { createAction } from '@reduxjs/toolkit';

export const setProblemData = createAction('problemForm/setProblemData');

export const setProblemTitle = (problemTitle) => ({
  type: "SET_PROBLEM_TITLE",
  payload: problemTitle,
});

export const setProblemLevel = (problemLevel) => ({
  type: "SET_PROBLEM_LEVEL",
  payload: problemLevel,
});

export const setProblemAlgorithmType = (problemAlgorithmType) => ({
  type: "SET_PROBLEM_ALGORITHM_TYPE",
  payload: problemAlgorithmType,
});

export const setProblemSource = (problemSource) => ({
  type: "SET_PROBLEM_SOURCE",
  payload: problemSource,
});

export const setProblemLink = (problemLink) => ({
  type: "SET_PROBLEM_LINK",
  payload: problemLink,
});

export const setProblemRestrictionTimePython = (
  problemRestrictionTimePython
) => ({
  type: "SET_PROBLEM_RESTRICTION_TIME_PYTHON",
  payload: problemRestrictionTimePython,
});

export const setProblemRestrictionTimeJava = (problemRestrictionTimeJava) => ({
  type: "SET_PROBLEM_RESTRICTION_TIME_JAVA",
  payload: problemRestrictionTimeJava,
});

export const setProblemRestrictionMemory = (problemRestrictionMemory) => ({
  type: "SET_PROBLEM_RESTRICTION_MEMORY",
  payload: problemRestrictionMemory,
});

// Editors

export const setProblemContent = (problemContent) => ({
  type: "SET_PROBLEM_CONTENT",
  payload: problemContent,
});

export const setProblemInputContent = (problemInputContent) => ({
  type: "SET_PROBLEM_INPUT_CONTENT",
  payload: problemInputContent,
});

export const setProblemOutputContent = (problemOutputContent) => ({
  type: "SET_PROBLEM_OUTPUT_CONTENT",
  payload: problemOutputContent,
});

// 이미지 blob urls (revokeObjectURL 필요)
export const setImageURLs = (imageURLs) => ({
  type: "SET_IMAGE_URLS",
  payload: imageURLs,
});

// 수정 여부 체크박스

// For problemUpdate
export const setProblemUpdate = (problemData) => ({
  type: "SET_PROBLEM_UPDATE",
  payload: problemData,
});

// For problemContentUpdate
export const setProblemContentUpdate = (contentData) => ({
  type: "SET_PROBLEM_CONTENT_UPDATE",
  payload: contentData,
});

// For testCaseUpdate
export const setTestCaseUpdate = (testCaseData) => ({
  type: "SET_TEST_CASE_UPDATE",
  payload: testCaseData,
});

