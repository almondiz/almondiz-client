import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: null,
  accessToken: null,
  refreshToken: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setEmail: (state, action) => { state.email = action.payload; },
    setAccessToken: (state, action) => { state.accessToken = action.payload; },
    setRefreshToken: (state, action) => { state.refreshToken = action.payload; },
  }
});

export const { setEmail, setAccessToken, setRefreshToken, } = accountSlice.actions;
export default accountSlice.reducer;