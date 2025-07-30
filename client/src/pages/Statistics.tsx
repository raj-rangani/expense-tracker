import React from "react";
import TopDaysChart from "../components/Statistics/TopDaysChart";
import MonthlyChangeChart from "../components/Statistics/MonthlyChangeChart";
import PredictionsChart from "../components/Statistics/PredictionsChart";

const Statistics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600">
          Analyze your spending patterns and trends
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="space-y-8">
        {/* Top Spending Days */}
        <TopDaysChart />

        {/* Monthly Change */}
        <MonthlyChangeChart />

        {/* Predictions */}
        <PredictionsChart />
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About These Statistics
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Top Spending Days:</strong> Shows each user's top 3 highest
            spending days, ordered by total amount spent.
          </p>
          <p>
            <strong>Monthly Change:</strong> Calculates the percentage change in
            total expenditure from the previous month for each user.
          </p>
          <p>
            <strong>Predictions:</strong> Predicts next month's total
            expenditure based on the average spending of the last 3 months.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
