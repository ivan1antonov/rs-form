import { createSlice } from '@reduxjs/toolkit';

const initState = { value: 'AFG' };

const searchReducer = createSlice({
  name: 'searchIso',
  initialState: initState,
  reducers: {
    setSearchIso: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchIso } = searchReducer.actions;
