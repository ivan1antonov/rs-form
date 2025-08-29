import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setSearchIso } from './reducers/searchReducer';

const rootReducer = combineReducers({
  setSearchIso,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();

export type rootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
