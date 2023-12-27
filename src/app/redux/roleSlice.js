import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const getInitialRole = () => {
  // Retrieve the role from cookies
  const role = Cookies.get('userRole');
  return role ? parseInt(role, 10) : null;
};

const initialState = {
  role: getInitialRole(),
};

const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      Cookies.set('userRole', action.payload.toString());
    },
    deleteRole: (state) => {
      state.role = null;
      // Remove the role from cookies
      Cookies.remove('userRole');
    },
  },
});

export const { setRole, deleteRole } = roleSlice.actions;
export const selectRole = (state) => state.role.role;

export default roleSlice.reducer;
