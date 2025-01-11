"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import recommendationReducer from './slices/recommendationSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    recommendations: recommendationReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
