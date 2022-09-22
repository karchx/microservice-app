import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleStore';
import authReducer from './authStore';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
