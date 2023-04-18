import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { storeReducer } from "./store";
import reduxThunk from "redux-thunk";

export const globalStore = configureStore(
  {
    // memasukkan reducer yg dibutuhkan
    reducer: {
      userReducer,
      cartReducer,
      storeReducer,
    },
  },
  applyMiddleware(reduxThunk)
);
