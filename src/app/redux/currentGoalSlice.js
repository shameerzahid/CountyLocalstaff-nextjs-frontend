import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goal: null,
  isActive: false,
  goalCreated: false,
};

const admincurrentgoalsSlice = createSlice({
  name: 'adminCurrentGoal',
  initialState,
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
      state.isActive = true;
      state.goalCreated = true;
    },
    removeGoal: (state) => {
      state.goal = null;
      state.isActive = false;
    },
    toggleGoalCreated: (state) => {
      state.goalCreated = !state.goalCreated;
    },
    updateGoal: (state, action) => {
      state.goalCreated = !state.goalCreated; // Toggle the value
    },
  },
});

export const { setGoal, removeGoal, toggleGoalCreated, updateGoal } = admincurrentgoalsSlice.actions;
export default admincurrentgoalsSlice.reducer;
