import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./slices/global";
import accountReducer from "./slices/account";

export default configureStore({
  reducer: {
    global: globalReducer,
    account: accountReducer,
  }
});