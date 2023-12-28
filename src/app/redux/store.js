"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userIdReducer from './userIdSlice';
import roleReducer from './roleSlice';  // Import the new roleSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userIdSlice: userIdReducer,
    role: roleReducer,  // Add the roleSlice to the store configuration
  },
});
