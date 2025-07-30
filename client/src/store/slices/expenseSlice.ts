import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as expenseService from "../../services/expenseService";

// Types
export type Expense = {
  id: number;
  // Add other fields as needed
  [key: string]: any;
};

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
};

type Filters = {
  user_id: string;
  category_id: string;
  start_date: string;
  end_date: string;
  page: number;
};

type ExpenseState = {
  expenses: Expense[];
  pagination: Pagination;
  filters: Filters;
  loading: boolean;
  error: string | null;
};

// Async thunks
export const fetchExpenses = createAsyncThunk<
  { expenses: Expense[]; pagination: Pagination },
  any,
  { rejectValue: string }
>("expenses/fetchExpenses", async (filters, { rejectWithValue }) => {
  try {
    const response = await expenseService.getExpenses(filters as any);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch expenses"
    );
  }
});

export const addExpense = createAsyncThunk<
  Expense,
  any,
  { rejectValue: string }
>("expenses/addExpense", async (expenseData, { rejectWithValue }) => {
  try {
    const response = await expenseService.createExpense(expenseData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add expense"
    );
  }
});

export const updateExpense = createAsyncThunk<
  Expense,
  { id: number; data: Partial<Expense> },
  { rejectValue: string }
>("expenses/updateExpense", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await expenseService.updateExpense(id, data);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update expense"
    );
  }
});

export const deleteExpense = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("expenses/deleteExpense", async (id, { rejectWithValue }) => {
  try {
    await expenseService.deleteExpense(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete expense"
    );
  }
});

const initialState: ExpenseState = {
  expenses: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
  },
  filters: {
    user_id: "",
    category_id: "",
    start_date: "",
    end_date: "",
    page: 1,
  },
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      // Add expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      // Update expense
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.error = action.payload || null;
      })
      // Delete expense
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

export const { setFilters, clearFilters, setPage, clearError } =
  expenseSlice.actions;

export default expenseSlice.reducer;
