import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchExpenses, type Expense } from "../store/slices/expenseSlice";
import ExpenseFilters from "../components/Expenses/ExpenseFilters";
import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import type { Expense as ExpenseFormExpense } from "../components/Expenses/ExpenseForm";
import { fetchUsers } from "../store/slices/userSlice";
import { fetchCategories } from "../store/slices/categorySlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, error } = useAppSelector((state) => state.expenses);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] =
    useState<ExpenseFormExpense | null>(null);

  useEffect(() => {
    // Load initial data
    dispatch(fetchUsers());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch expenses when filters change
    dispatch(fetchExpenses(filters));
  }, [dispatch, filters]);

  const handleAddNew = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense as ExpenseFormExpense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    console.log("Hello");
    setEditingExpense(null);
  };

  const handleFormSuccess = () => {
    // Refresh the expense list
    dispatch(fetchExpenses(filters));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Expense Dashboard
          </h1>
          <p className="text-gray-600">Track and manage your expenses</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary">
          Add Expense
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <ExpenseFilters />

      {/* Expense List */}
      <ExpenseList onEdit={handleEdit} />

      {/* Form Modal */}
      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
