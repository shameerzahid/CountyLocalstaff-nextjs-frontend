// adminOverviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goalStats: null,
};

const adminOverviewSlice = createSlice({
  name: 'adminOverview',
  initialState,
  reducers: {
    setGoalStats: (state, action) => {
      state.goalStats = action.payload;
    },
    clearGoalStats: (state) => {
      state.goalStats = null;
    },
  },
});

export const { setGoalStats, clearGoalStats } = adminOverviewSlice.actions;
export default adminOverviewSlice.reducer;
