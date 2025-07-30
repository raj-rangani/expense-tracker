import api from "./api";

export const getExpenses = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value as string);
  });

  return api.get(`/expenses?${params.toString()}`);
};

export const createExpense = (expenseData: any) => {
  return api.post("/expenses", expenseData);
};

export const updateExpense = (id: number, expenseData: any) => {
  return api.put(`/expenses/${id}`, expenseData);
};

export const deleteExpense = (id: number) => {
  return api.delete(`/expenses/${id}`);
};
