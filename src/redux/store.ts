import { configureStore } from "@reduxjs/toolkit";

import stateSlice from "./stateSlice";

export default configureStore({
  reducer: {
    states: stateSlice,
  },
});
