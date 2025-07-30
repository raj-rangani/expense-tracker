import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../../store/slices/expenseSlice";
import type { RootState } from "../../store";
import dayjs from "dayjs";

interface User {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export interface Expense {
  id?: number;
  user_id: number;
  category_id: number;
  amount: number;
  date: string;
  description?: string;
}

interface ExpenseFormProps {
  expense?: Expense | null;
  onClose?: () => void;
  onSuccess?: () => void;
}

interface FormData {
  user_id: string;
  category_id: string;
  amount: string;
  date: string;
  description: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense = null,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users as User[]);
  const categories = useSelector(
    (state: RootState) => state.categories.categories as Category[]
  );
  const loading = useSelector(
    (state: RootState) => state.expenses.loading as boolean
  );

  console.log(expense);
  const [formData, setFormData] = useState<FormData>({
    user_id: expense?.user_id?.toString() || "",
    category_id: expense?.category_id?.toString() || "",
    amount: expense?.amount?.toString() || "",
    date: dayjs(expense?.date ?? new Date()).format("YYYY-MM-DD"),
    description: expense?.description || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.user_id) newErrors.user_id = "User is required";
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const expenseData: Expense = {
        ...formData,
        amount: parseFloat(formData.amount),
        user_id: parseInt(formData.user_id),
        category_id: parseInt(formData.category_id),
        description: formData.description,
        date: formData.date,
      };

      if (expense && expense.id) {
        await dispatch(
          updateExpense({ id: expense.id, data: expenseData }) as any
        ).unwrap();
      } else {
        await dispatch(addExpense(expenseData) as any).unwrap();
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {expense ? "Edit Expense" : "Add New Expense"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User *
              </label>
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className={`input ${errors.user_id ? "border-red-500" : ""}`}
                required
              >
                <option value="">Select User</option>
                {users.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.user_id && (
                <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`input ${
                  errors.category_id ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category_id}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`input ${errors.amount ? "border-red-500" : ""}`}
                placeholder="0.00"
                required
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`input ${errors.date ? "border-red-500" : ""}`}
                required
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Optional description..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : expense ? "Update" : "Add"} Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
