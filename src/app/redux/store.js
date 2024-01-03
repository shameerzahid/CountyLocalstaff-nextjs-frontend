"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userIdReducer from './userIdSlice';
import roleReducer from './roleSlice'; 
import adminCurrentGoalReducer from './currentGoalSlice'
import { userSlice } from './userDetailsSlice';
import { userTableSlice } from './userTableSlice';
import admingoaluseridReducer from './adminGoalUserIdSlice';
import adminOverviewReducer from './adminOverviewSlice';
import adminUpcomingGoalReducer from './upcomingGoalSlice';
import adminReportReducer from './AdminReportSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userIdSlice: userIdReducer,
    role: roleReducer, 
    user: userSlice.reducer,
    userTable: userTableSlice.reducer,
    adminCurrentGoal: adminCurrentGoalReducer,
    admingoaluserid: admingoaluseridReducer,
    adminOverview: adminOverviewReducer,
    adminUpcomingGoal: adminUpcomingGoalReducer,
    adminReport: adminReportReducer,
      },
});
