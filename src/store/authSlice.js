import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.clear();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
