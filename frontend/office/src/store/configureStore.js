import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import apiCall from "./middleware/apiCall";

const configureSt = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [...getDefaultMiddleware(), apiCall],
  });

export default configureSt;
