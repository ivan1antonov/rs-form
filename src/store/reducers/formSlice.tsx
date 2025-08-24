import { createSlice } from '@reduxjs/toolkit';
import type { FormData } from '../../types/form';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormsState {
  uncontrolled: FormData[];
  controlled: FormData[];
}

const initialState: FormsState = {
  uncontrolled: [],
  controlled: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledForm: (state, action: PayloadAction<FormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addControlledForm: (state, action: PayloadAction<FormData>) => {
      state.controlled.push(action.payload);
    },
  },
});

export const { addUncontrolledForm, addControlledForm } = formsSlice.actions;
export default formsSlice.reducer;
