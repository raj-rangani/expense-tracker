import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice";
import statisticsReducer from "./slices/statisticsSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    statistics: statisticsReducer,
    users: userReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
