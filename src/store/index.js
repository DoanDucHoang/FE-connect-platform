import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loadingReducer from './loadingSlice';
import editReducer from './editSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    edit: editReducer,
  },
});

export default store;
