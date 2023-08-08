import { configureStore } from '@reduxjs/toolkit';
import ideReducer from '../Reducer/ideReducers';

const store = configureStore({
  reducer: {
    ide: ideReducer,
  }
});

export default store;