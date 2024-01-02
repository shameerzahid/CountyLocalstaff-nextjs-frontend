import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminUpcomingGoal: null,
  goalCreated: false,
  loading: true, // Initial loading state
};

const adminUpcomingGoalSlice = createSlice({
  name: 'adminUpcomingGoal',
  initialState,
  reducers: {
    setUpcomingGoals: (state, action) => {
      state.adminUpcomingGoal = action.payload;
      state.goalCreated = true;
      state.loading = false; // Set loading to false after goal creation
    },
    removeUpcomingGoals: (state) => {
        state.loading = true; // Set loading to true before removing goal
      state.adminUpcomingGoal = null;
      state.goalCreated = false;
    },
    toggleUpcomingGoalsCreated: (state) => {
      state.goalCreated = !state.goalCreated;
    },
    updateUpcomingGoals: (state) => {
      state.goalCreated = !state.goalCreated; // Toggle the value
    },
    toggleUpcomingLoading: (state) => {
      state.loading = false; // Toggle the upcomingLoading value
    },
  },
});

export const {
  setUpcomingGoals,
  removeUpcomingGoals,
  toggleUpcomingGoalsCreated,
  updateUpcomingGoals,
  toggleUpcomingLoading,
} = adminUpcomingGoalSlice.actions;
export default adminUpcomingGoalSlice.reducer;
