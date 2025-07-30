import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyChange } from "../../store/slices/statisticsSlice";
import type { RootState, AppDispatch } from "../../store";

// Define the type for a single monthly change entry
interface MonthlyChange {
  user_id: number;
  user_name: string;
  year: number;
  month: number;
  current_month_total: number;
  previous_month_total: number;
  percentage_change: number;
}

interface GroupedData {
  [user_id: number]: {
    user_name: string;
    months: MonthlyChange[];
  };
}

const MonthlyChangeChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { monthlyChange, loading } = useSelector(
    (state: RootState) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchMonthlyChange());
  }, [dispatch]);

  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1];
  };

  const getChangeColor = (percentage: number) => {
    if (percentage > 0) return "text-red-600 bg-red-50";
    if (percentage < 0) return "text-green-600 bg-green-50";
    return "text-gray-600 bg-gray-50";
  };

  const getChangeIcon = (percentage: number) => {
    if (percentage > 0) return "↗";
    if (percentage < 0) return "↘";
    return "→";
  };

  if (loading.monthlyChange) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Monthly Spending Change
        </h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading statistics...</p>
        </div>
      </div>
    );
  }

  // Group by user
  const groupedData: GroupedData = (monthlyChange as MonthlyChange[]).reduce(
    (acc: GroupedData, item: MonthlyChange) => {
      if (!acc[item.user_id]) {
        acc[item.user_id] = {
          user_name: item.user_name,
          months: [],
        };
      }
      acc[item.user_id].months.push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="card rounded-2xl">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Monthly Spending Change (% from Previous Month)
      </h3>

      {Object.keys(groupedData).length === 0 ? (
        <p className="text-gray-500 text-center py-4">No data available</p>
      ) : (
        <div className="space-y-6">
          {Object.values(groupedData).map((userData) => (
            <div
              key={userData.user_name}
              className="border border-slate-100 bg-slate-50 rounded-xl p-4"
            >
              <h4 className="font-medium text-gray-900 mb-3">
                {userData.user_name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {userData.months.slice(0, 6).map((month: MonthlyChange) => (
                  <div
                    key={`${month.year}-${month.month}`}
                    className="border border-slate-100 rounded-xl p-3 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {getMonthName(month.month)} {month.year}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getChangeColor(
                          month.percentage_change
                        )}`}
                      >
                        {getChangeIcon(month.percentage_change)}{" "}
                        {Math.abs(month.percentage_change)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>
                        Current: ₹{month.current_month_total.toFixed(2)}
                      </div>
                      <div>
                        Previous: ₹{month.previous_month_total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthlyChangeChart;
