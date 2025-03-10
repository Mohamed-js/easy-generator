import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;