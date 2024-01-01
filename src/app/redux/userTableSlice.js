// userTableSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      // If payload is an array, replace the existing users with the new array
      if (Array.isArray(action.payload)) {
        state.users = action.payload;
      } else {
        // If payload is an object, add it to the existing array
        state.users = [...state.users, action.payload];
      }
    },
    removeUser: (state, action) => {
      // Filter out the user with the specified ID
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, removeUser } = userTableSlice.actions;
export const selectUserTable = (state) => state.userTable;
