import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  setSearchIso: searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
