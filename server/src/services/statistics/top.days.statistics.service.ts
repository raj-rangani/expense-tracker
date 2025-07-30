import { RequestHandler } from "express";
import { pool } from "../../configs/database";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const getTopDaysByUser: RequestHandler = asyncHandler(async (req, res) => {
  const query = `
    WITH daily_totals AS (
        SELECT 
            e.user_id,
            u.name as user_name,
            e.date,
            SUM(e.amount) as daily_total
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        GROUP BY e.user_id, u.name, e.date
    ),
    ranked_days AS (
        SELECT 
            user_id,
            user_name,
            date,
            daily_total,
            ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY daily_total DESC) as rank_num
        FROM daily_totals
    )
    SELECT 
        user_id,
        user_name,
        date,
        daily_total
    FROM ranked_days
    WHERE rank_num <= 3
    ORDER BY user_id, daily_total DESC
`;

  const [results] = await pool.execute(query);

  // Group by user
  const groupedResults = (results as any).reduce((acc, row) => {
    if (!acc[row.user_id]) {
      acc[row.user_id] = {
        user_id: row.user_id,
        user_name: row.user_name,
        top_days: [],
      };
    }
    acc[row.user_id].top_days.push({
      date: row.date,
      total_amount: parseFloat(row.daily_total),
    });
    return acc;
  }, {});

  return res.status(200).send(new ApiResponse(200, groupedResults));
});

export { getTopDaysByUser };
