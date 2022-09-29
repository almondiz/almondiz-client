import { configureStore } from "@reduxjs/toolkit";

import { globalReducer, accountReducer } from "./slices";


export default configureStore({
  reducer: {
    global: globalReducer,
    account: accountReducer,
  }
});