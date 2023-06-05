import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'edit',
  initialState: {
    //currentUser: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: true,
  },
  reducers: {
    editProfile: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { editProfile } = editSlice.actions;
export default editSlice.reducer;
