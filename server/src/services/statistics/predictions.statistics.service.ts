import { RequestHandler } from "express";
import { pool } from "../../configs/database";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const getPredictions: RequestHandler = asyncHandler(async (req, res) => {
  const query = `
    WITH monthly_totals AS (
        SELECT 
            e.user_id,
            u.name as user_name,
            YEAR(e.date) as year,
            MONTH(e.date) as month,
            SUM(e.amount) as monthly_total
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        GROUP BY e.user_id, u.name, YEAR(e.date), MONTH(e.date)
    ),
    recent_months AS (
        SELECT 
            user_id,
            user_name,
            year,
            month,
            monthly_total,
            ROW_NUMBER() OVER (
                PARTITION BY user_id 
                ORDER BY year DESC, month DESC
            ) as month_rank
        FROM monthly_totals
    ),
    last_three_months AS (
        SELECT 
            user_id,
            user_name,
            AVG(monthly_total) as avg_last_3_months
        FROM recent_months
        WHERE month_rank <= 3
        GROUP BY user_id, user_name
    )
    SELECT 
        user_id,
        user_name,
        ROUND(avg_last_3_months, 2) as predicted_next_month
    FROM last_three_months
    ORDER BY user_id
`;

  const [results] = await pool.execute(query);
  const predictions = (results as any).map((row) => ({
    user_id: row.user_id,
    user_name: row.user_name,
    predicted_amount: parseFloat(row.predicted_next_month),
  }));

  return res.status(200).send(new ApiResponse(200, predictions));
});

export { getPredictions };
