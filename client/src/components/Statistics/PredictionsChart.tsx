import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchPredictions } from "../../store/slices/statisticsSlice";

// Define the Prediction type based on usage in this component
interface Prediction {
  user_id: string;
  user_name: string;
  predicted_amount: number;
}

const PredictionsChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { predictions, loading } = useSelector(
    (state: RootState) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  if (loading.predictions) {
    return (
      <div className="card rounded-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Next Month Spending Predictions
        </h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading predictions...</p>
        </div>
      </div>
    );
  }

  const getNextMonth = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="card rounded-2xl">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Spending Predictions for {getNextMonth()}
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Based on average spending of the last 3 months
      </p>

      {predictions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No data available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {predictions.map((prediction: Prediction) => (
            <div
              key={prediction.user_id}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  {prediction.user_name}
                </h4>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                ₹{prediction.predicted_amount.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600">Predicted spending</p>
              <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-2">
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  3-month average
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictionsChart;
