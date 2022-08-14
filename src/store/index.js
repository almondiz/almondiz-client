import { configureStore, createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
    name: "store",
    initialState: {},
    reducers: {
        a: () => { },
    }
})

export default configureStore({
    reducer: { foo: reducerSlice.reducer }
});