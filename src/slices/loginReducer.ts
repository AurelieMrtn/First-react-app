import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  isAuthenticated: false,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, password: string }>) => {
      if (action.payload.username === 'usertest' && action.payload.password === 'mypassword') {
        state.isAuthenticated = true;
      }
      else {throw new Error('Username or password is wrong')}
    },
    cachedLogin: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, cachedLogin } = loginSlice.actions;

export default loginSlice;