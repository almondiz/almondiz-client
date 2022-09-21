import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollDirection: 0,
    location: {
      address: "수원 팔달구 우만동",
      lati: 37.284018,
      longi: 127.030147,
    },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setScrollDirection: (state, action) => { state.scrollDirection = action.payload; },
    setLocation: (state, action) => { state.location = action.payload; },
  }
});

export const { setScrollDirection, setLocation, } = globalSlice.actions;
export default globalSlice.reducer;