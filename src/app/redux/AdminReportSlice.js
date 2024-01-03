import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: null,
  loading: true, // Initial loading state is true
};

const adminReportSlice = createSlice({
  name: 'adminReport',
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
      state.loading = false; // Set loading to false when reports are set
    },
    clearReports: (state) => {
      state.reports = [];
      state.loading = true; // Set loading to true when reports are cleared
    },
    toggleReportLoading: (state) => {
      state.loading = false; // Toggle loading state
    },
    // You can add more actions based on your requirements
  },
});

export const { setReports, clearReports, toggleReportLoading } = adminReportSlice.actions;
export const selectReports = (state) => state.adminReport.reports;
export const selectLoading = (state) => state.adminReport.loading; // Select loading state

export default adminReportSlice.reducer;
