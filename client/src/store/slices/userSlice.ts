import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../services/userService";

// Types
interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

// Async thunks
export const fetchUsers = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUsers();
    return response.data.data;
  } catch (error) {
    let message = "Failed to fetch users";
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
