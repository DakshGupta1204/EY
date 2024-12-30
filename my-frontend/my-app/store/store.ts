"use client"
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    //add
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
