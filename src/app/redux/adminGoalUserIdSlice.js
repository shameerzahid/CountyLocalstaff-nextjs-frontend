import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  goalId: Cookies.get('goalId') || null,
  userId: Cookies.get('userId') || null,
};

const admingoaluseridSlice = createSlice({
  name: 'admingoaluserid',
  initialState,
  reducers: {
    setGoalUserId: (state, action) => {
      const { goalId, userId } = action.payload;

      // Clear previous cookies
      Cookies.remove('goalId');
      Cookies.remove('userId');

      // Update state
      state.goalId = goalId;
      state.userId = userId;

      // Update cookies with new values
      Cookies.set('goalId', goalId);
      Cookies.set('userId', userId);
    },
    clearGoalUserId: (state) => {
      state.goalId = null;
      state.userId = null;

      // Clear cookies
      Cookies.remove('goalId');
      Cookies.remove('userId');
    },
  },
});

export const { setGoalUserId, clearGoalUserId } = admingoaluseridSlice.actions;
export const selectGoalUserId = (state) => state.admingoaluserid;

export default admingoaluseridSlice.reducer;
