import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: null,
  providerType: null,
  providerUid: null,
  accessToken: null,
  refreshToken: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setEmail: (state, action) => { state.email = action.payload; },
    setProviderType: (state, action) => { state.providerType = action.payload; },
    setProviderUid: (state, action) => { state.providerUid = action.payload; },
    setAccessToken: (state, action) => { state.accessToken = action.payload; },
    setRefreshToken: (state, action) => { state.refreshToken = action.payload; },
    resetAccount: (state, action) => {
      state = {
        ...state,
        ...initialState
      }
    },
  }
});

export const {
  setEmail,
  setAccessToken,
  setRefreshToken,
  setProviderUid,
  setProviderType,
  resetAccount,
} = accountSlice.actions;
export const getAccountInfo = (state) => state.account;
export default accountSlice.reducer;