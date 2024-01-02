import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetUser: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
    },
  },
});

export const { setFirstName, setLastName, setEmail, resetUser } = userSlice.actions;
export const selectUser = (state) => state.user;
