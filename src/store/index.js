import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./slices/global";

export default configureStore({
  reducer: {
    global: globalReducer,
  }
});