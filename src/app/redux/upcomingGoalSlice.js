import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminUpcomingGoal: null,
  goalCreated: false,
};

const adminUpcomingGoalSlice = createSlice({
  name: 'adminUpcomingGoal',
  initialState,
  reducers: {
    setUpcomingGoals: (state, action) => {
      state.adminUpcomingGoal = action.payload;
      state.goalCreated = true;
    },
    removeUpcomingGoals: (state) => {
      state.adminUpcomingGoal = null;
      state.goalCreated = false;
    },
    toggleUpcomingGoalsCreated: (state) => {
      state.goalCreated = !state.goalCreated;
    },
    updateUpcomingGoals: (state) => {
      state.goalCreated = !state.goalCreated; // Toggle the value
    },
  },
});

export const { setUpcomingGoals, removeUpcomingGoals, toggleGoalCreateds, updateGoals } = adminUpcomingGoalSlice.actions;
export default adminUpcomingGoalSlice.reducer;
