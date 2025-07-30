import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../store/slices/expenseSlice";
import type { RootState } from "../../store";

const ExpenseFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.expenses);
  const users = useSelector((state: RootState) => state.users.users);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const handleFilterChange = (filterName: string, value: string) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== "" && value !== 1
  );

  return (
    <div className="card mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by User
          </label>
          <select
            value={filters.user_id}
            onChange={(e) => handleFilterChange("user_id", e.target.value)}
            className="input"
          >
            <option value="">All Users</option>
            {users.map((user: { id: string | number; name: string }) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            value={filters.category_id}
            onChange={(e) => handleFilterChange("category_id", e.target.value)}
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map(
              (category: { id: string | number; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex-1 min-w-36">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={filters.start_date}
            onChange={(e) => handleFilterChange("start_date", e.target.value)}
            className="input"
          />
        </div>

        <div className="flex-1 min-w-36">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={filters.end_date}
            onChange={(e) => handleFilterChange("end_date", e.target.value)}
            className="input"
          />
        </div>

        <div className="flex gap-2">
          {hasActiveFilters && (
            <button onClick={handleClearFilters} className="btn-secondary">
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
