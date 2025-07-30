import { RequestHandler } from "express";
import { pool } from "../../configs/database";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const getMonthlyChange: RequestHandler = asyncHandler(async (req, res) => {
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
    monthly_comparison AS (
        SELECT 
            user_id,
            user_name,
            year,
            month,
            monthly_total,
            LAG(monthly_total) OVER (
                PARTITION BY user_id 
                ORDER BY year, month
            ) as previous_month_total
        FROM monthly_totals
    )
    SELECT 
        user_id,
        user_name,
        year,
        month,
        monthly_total,
        previous_month_total,
        CASE 
            WHEN previous_month_total IS NULL THEN NULL
            WHEN previous_month_total = 0 THEN 100
            ELSE ROUND(
                ((monthly_total - previous_month_total) / previous_month_total) * 100, 2
            )
        END as percentage_change
    FROM monthly_comparison
    WHERE previous_month_total IS NOT NULL
    ORDER BY user_id, year DESC, month DESC
`;

  const [results] = await pool.execute(query);
  const monthlyData = (results as any).map((row) => ({
    user_id: row.user_id,
    user_name: row.user_name,
    year: row.year,
    month: row.month,
    current_month_total: parseFloat(row.monthly_total),
    previous_month_total: parseFloat(row.previous_month_total),
    percentage_change: row.percentage_change,
  }));

  return res.status(200).send(new ApiResponse(200, monthlyData));
});

export { getMonthlyChange };
