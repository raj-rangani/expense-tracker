import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchTopDays } from "../../store/slices/statisticsSlice";

const TopDaysChart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  interface TopDay {
    date: string;
    total_amount: number;
  }
  interface UserTopDays {
    user_id: number | string;
    user_name: string;
    top_days: TopDay[];
  }

  // The backend returns an object, but the component expects an array. Convert if needed.
  const { topDays, loading } = useSelector((state: RootState) => {
    let topDaysArr: UserTopDays[] = [];
    if (state.statistics.topDays && !Array.isArray(state.statistics.topDays)) {
      topDaysArr = Object.values(state.statistics.topDays);
    } else {
      topDaysArr = state.statistics.topDays as UserTopDays[];
    }
    return { topDays: topDaysArr, loading: state.statistics.loading };
  });

  useEffect(() => {
    dispatch(fetchTopDays());
  }, [dispatch]);

  if (loading.topDays) {
    return (
      <div className="card rounded-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Top 3 Spending Days by User
        </h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card rounded-2xl">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Top 3 Spending Days by User
      </h3>

      {topDays.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No data available</p>
      ) : (
        <div className="space-y-6">
          {topDays.map((userData: UserTopDays) => (
            <div
              key={userData.user_id}
              className="border border-blue-50 bg-white rounded-xl p-4"
            >
              <h4 className="font-medium text-gray-900 mb-3">
                {userData.user_name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {userData.top_days.map((day: TopDay, index: number) => (
                  <div
                    key={`${userData.user_id}-${day.date}`}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">
                        #{index + 1}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{day.total_amount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {dayjs(day.date).format("MMM DD, YYYY")}
                    </p>
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

export default TopDaysChart;
