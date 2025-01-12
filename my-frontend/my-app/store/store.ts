"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import recommendationReducer from './slices/recommendationSlice'
import courseReducer from './slices/courseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    recommendations: recommendationReducer,
    courses: courseReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
