import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookAPI from "../../../api/bookAPI.js";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookAPI.get("/getAllBooks");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch books.";
      });
  },
});

export default bookSlice.reducer;
