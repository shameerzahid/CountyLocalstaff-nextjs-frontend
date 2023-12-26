// userIdSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Function to get the initial user ID from cookies
const getInitialUserId = () => {
  return Cookies.get('userId') || null;
};

const initialState = {
  userId: getInitialUserId(),
};

const userIdSlice = createSlice({
  name: 'userIdSlice',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      // Save the user ID to cookies
      Cookies.set('userId', action.payload);
      console.log(state.userId);
    },
    deleteUserId: (state) => {
      state.userId = null;
      // Remove the user ID from cookies
      Cookies.remove('userId');
      console.log("user id : ", state.userId);
    },
  },
});

export const { setUserId, deleteUserId } = userIdSlice.actions;
export const selectUserId = (state) => state.userIdSlice.userId;

export default userIdSlice.reducer;
