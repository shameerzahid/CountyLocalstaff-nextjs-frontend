// userTableSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userTableSlice.actions;
export const selectUserTable = (state) => state.userTable;