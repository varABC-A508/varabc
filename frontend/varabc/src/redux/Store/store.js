import { configureStore } from '@reduxjs/toolkit';
import ideReducer from '../Reducer/ideReducers';
import problemFormReducer from '../Reducer/problemFormReducers';
import problemPostReducer from '../Reducer/problemPostReducers';
import adminReducer from '../Reducer/adminReducers';
import userReducers from '../Reducer/userReducers';

const store = configureStore({
  reducer: {
    ide: ideReducer,
    problemForm: problemFormReducer,
    problemPost: problemPostReducer,
    admin: adminReducer,
    user: userReducers,
  }
});

export default store;