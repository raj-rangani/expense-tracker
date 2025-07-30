import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as statisticsService from "../../services/statisticsService";

// Async thunks
export const fetchTopDays = createAsyncThunk(
  "statistics/fetchTopDays",
  async (_, { rejectWithValue }) => {
    try {
      const response = await statisticsService.getTopDays();
      return response.data.data;
    } catch (error) {
      const err = error as any;
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch top days"
      );
    }
  }
);

export const fetchMonthlyChange = createAsyncThunk(
  "statistics/fetchMonthlyChange",
  async (_, { rejectWithValue }) => {
    try {
      const response = await statisticsService.getMonthlyChange();
      return response.data.data;
    } catch (error) {
      const err = error as any;
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch monthly change"
      );
    }
  }
);

export const fetchPredictions = createAsyncThunk(
  "statistics/fetchPredictions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await statisticsService.getPredictions();
      return response.data.data;
    } catch (error) {
      const err = error as any;
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch predictions"
      );
    }
  }
);

const initialState = {
  topDays: [],
  monthlyChange: [],
  predictions: [],
  loading: {
    topDays: false,
    monthlyChange: false,
    predictions: false,
  },
  error: null as string | null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Top days
      .addCase(fetchTopDays.pending, (state) => {
        state.loading.topDays = true;
        state.error = null;
      })
      .addCase(fetchTopDays.fulfilled, (state, action) => {
        state.loading.topDays = false;
        state.topDays = action.payload;
      })
      .addCase(fetchTopDays.rejected, (state, action) => {
        state.loading.topDays = false;
        state.error = action.payload as string;
      })
      // Monthly change
      .addCase(fetchMonthlyChange.pending, (state) => {
        state.loading.monthlyChange = true;
      })
      .addCase(fetchMonthlyChange.fulfilled, (state, action) => {
        state.loading.monthlyChange = false;
        state.monthlyChange = action.payload;
      })
      .addCase(fetchMonthlyChange.rejected, (state, action) => {
        state.loading.monthlyChange = false;
        state.error = action.payload as string;
      })
      // Predictions
      .addCase(fetchPredictions.pending, (state) => {
        state.loading.predictions = true;
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading.predictions = false;
        state.predictions = action.payload;
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading.predictions = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = statisticsSlice.actions;
export default statisticsSlice.reducer;
