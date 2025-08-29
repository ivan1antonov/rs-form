import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  value: string;
}

const initState: SearchState = { value: 'AFG' };

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
export default searchReducer.reducer;
