import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false,
  },
  reducers: {
    setLoading: state => {
      state.value = true;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
