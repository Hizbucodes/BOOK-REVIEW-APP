import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../app/features/book";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});
