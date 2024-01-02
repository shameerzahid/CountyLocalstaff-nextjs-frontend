import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goal: null,
  isActive: false,
  goalCreated: false,
  loading: true, // Initially set to true
};

const admincurrentgoalsSlice = createSlice({
  name: 'adminCurrentGoal',
  initialState,
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
      state.isActive = true;
      state.goalCreated = true;
      state.loading = false; // Set loading to false when a goal is created
    },
    removeGoal: (state) => {
        state.loading = true; // Set loading to true when there is no goal
      state.goal = null;
      state.isActive = false;
    },
    toggleGoalCreated: (state) => {
      state.goalCreated = !state.goalCreated;
    },
    updateGoal: (state) => {
      state.goalCreated = !state.goalCreated; // Toggle the value
    },
    toggleLoading: (state) => {
      state.loading = false; // Toggle the loading state
    },
  },
});

export const { setGoal, removeGoal, toggleGoalCreated, updateGoal, toggleLoading } = admincurrentgoalsSlice.actions;
export default admincurrentgoalsSlice.reducer;
