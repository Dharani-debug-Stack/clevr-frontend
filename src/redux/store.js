
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";
import adminReducer from "./admin/adminSlice"

const store = configureStore({
  reducer: {
    books: booksReducer,
    admin: adminReducer,
  },
});

export default store;
