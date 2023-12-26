// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const getInitialToken = () => {
  // Retrieve the token from cookies
  return Cookies.get('authToken') || null;
};

const initialState = {
  token: getInitialToken(),
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // Save the token to cookies
      Cookies.set('authToken', action.payload);
    },
    deleteToken: (state) => {
      state.token = null;
      // Remove the token from cookies
      Cookies.remove('authToken');
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
