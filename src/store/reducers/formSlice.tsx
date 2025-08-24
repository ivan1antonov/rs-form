import { createSlice } from '@reduxjs/toolkit';
import type { ModalFormData } from '../../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormsState {
  uncontrolled: ModalFormData[];
  controlled: ModalFormData[];
}

const initialState: FormsState = {
  uncontrolled: [],
  controlled: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledForm: (state, action: PayloadAction<ModalFormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addControlledForm: (state, action: PayloadAction<ModalFormData>) => {
      state.controlled.push(action.payload);
    },
  },
});

export const { addUncontrolledForm, addControlledForm } = formsSlice.actions;
export default formsSlice.reducer;
