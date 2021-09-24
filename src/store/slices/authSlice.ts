import { createSlice } from '@reduxjs/toolkit';

export interface AuthSlice {
  authorized: boolean;
}

const initialState: AuthSlice = {
  authorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.authorized = true;
    },
    logout: state => {
      state.authorized = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
