import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    logout: (state)=>{
      localStorage.removeItem("token");
      state.token = null;
    }
  },
});

export const { setToken, clearToken, logout } = sessionSlice.actions;
export default sessionSlice.reducer;