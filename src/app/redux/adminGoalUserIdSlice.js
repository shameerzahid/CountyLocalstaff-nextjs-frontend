// admingoaluseridSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goalId: null,
  userId: null,
};

const admingoaluseridSlice = createSlice({
  name: 'admingoaluserid',
  initialState,
  reducers: {
    setGoalUserId: (state, action) => {
      const { goalId, userId } = action.payload;
      state.goalId = goalId;
      state.userId = userId;
    },
    clearGoalUserId: (state) => {
      state.goalId = null;
      state.userId = null;
    },
  },
});

export const { setGoalUserId, clearGoalUserId } = admingoaluseridSlice.actions;
export const selectGoalUserId = (state) => state.admingoaluserid;

export default admingoaluseridSlice.reducer;
