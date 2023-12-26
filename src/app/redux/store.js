"use client"
const { configureStore } = require("@reduxjs/toolkit");
import authReducer from './authSlice';
import userIdReducer from './userIdSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userIdSlice: userIdReducer,
  },
});
export const getTokenFromStore = () => {
  const state = store.getState();
  console.log(state.auth.token)
  return state.auth.token;
};
