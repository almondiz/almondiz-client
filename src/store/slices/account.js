import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  providerType: null, providerUid: null, email: null,
  accessToken: null, refreshToken: null, myUserId: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setProviderType: (state, action) => { state.providerType = action.payload; },
    setProviderUid: (state, action) => { state.providerUid = action.payload; },
    setEmail: (state, action) => { state.email = action.payload; },
    setAccessToken: (state, action) => { state.accessToken = action.payload; },
    setRefreshToken: (state, action) => { state.refreshToken = action.payload; },
    setMyUserId: (state, action) => { state.myUserId = action.payload; },
    //resetAccount: (state, action) => { state = { ...state, ...initialState }; console.log(state); },
  },
});

export const {
  setAccessToken, setRefreshToken, setEmail,
  setProviderUid, setProviderType, setMyUserId,
  //resetAccount,
} = accountSlice.actions;
export const getAccountInfo = state => state.account;

export default accountSlice.reducer;