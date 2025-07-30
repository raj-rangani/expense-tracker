import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryService from "../../services/categoryService";

// Types
interface UserState {
  categories: any[];
  loading: boolean;
  error: string | null;
}

// Async thunks
export const fetchCategories = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await categoryService.getCategories();
    return response.data.data;
  } catch (error) {
    let message = "Failed to fetch categories";
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

const initialState: UserState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
