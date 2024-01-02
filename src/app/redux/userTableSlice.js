import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.users = action.payload;
      } else {
        state.users = [...state.users, action.payload];
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    removeAllUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, removeUser, removeAllUsers } = userTableSlice.actions;
export const selectUserTable = (state) => state.userTable;
