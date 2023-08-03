import { configureStore } from '@reduxjs/toolkit';
import ideReducer from '../Reducer/ideReducers';

const ideStore = configureStore({
  reducer: {
    ide: ideReducer,
  }
});

export default ideStore;