import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// Define TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
