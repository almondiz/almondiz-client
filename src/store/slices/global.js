import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollDirection: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setScrollDirection: (state, action) => { state.scrollDirection = action.payload; },
  }
});

export const { setScrollDirection, } = globalSlice.actions;
export default globalSlice.reducer;