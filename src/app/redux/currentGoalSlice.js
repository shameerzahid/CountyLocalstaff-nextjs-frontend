// adminCurrentGoalSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = [];

// Create the slice
const adminCurrentGoalSlice = createSlice({
  name: 'adminCurrentGoal',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      // Add a new goal to the array
      state.push(action.payload);
    },
    updateGoal: (state, action) => {
      // Update an existing goal in the array
      const { _id, updatedGoal } = action.payload;
      const index = state.findIndex((goal) => goal._id === _id);
      if (index !== -1) {
        state[index] = updatedGoal;
      }
    },
    removeGoal: (state, action) => {
      // Remove a goal from the array by ID
      const goalId = action.payload;
      return state.filter((goal) => goal._id !== goalId);
    },
  },
});

// Export the actions
export const { addGoal, updateGoal, removeGoal } = adminCurrentGoalSlice.actions;

// Export the reducer
export default adminCurrentGoalSlice.reducer;
