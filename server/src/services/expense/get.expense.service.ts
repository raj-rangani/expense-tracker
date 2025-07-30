import { RequestHandler } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { pool } from "../../configs/database";
import { expenseGetValidator } from "../../validators/expense/get.expense.validator";

const getExpenses: RequestHandler = asyncHandler(async (req, res) => {
  const {
    user_id,
    category_id,
    start_date,
    end_date,
    page = 1,
    limit = 10,
  } = expenseGetValidator().parse(req.query);

  let query = `
            SELECT e.*, u.name as user_name, c.name as category_name 
            FROM expenses e
            JOIN users u ON e.user_id = u.id
            JOIN categories c ON e.category_id = c.id
            WHERE 1=1
        `;

  const params = [];

  if (user_id) {
    query += " AND e.user_id = ?";
    params.push(user_id);
  }

  if (category_id) {
    query += " AND e.category_id = ?";
    params.push(category_id);
  }

  if (start_date) {
    query += " AND e.date >= ?";
    params.push(start_date);
  }

  if (end_date) {
    query += " AND e.date <= ?";
    params.push(end_date);
  }

  query += " ORDER BY e.date DESC, e.created_at DESC";

  // Add pagination
  const offset = (page - 1) * limit;
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  //   params.push(limit, offset);

  console.log(params);
  const [expenses] = await pool.execute(query, params);

  // Get total count for pagination
  let countQuery = "SELECT COUNT(*) as total FROM expenses e WHERE 1=1";
  const countParams = params; // Remove limit and offset

  if (user_id) countQuery += " AND e.user_id = ?";
  if (category_id) countQuery += " AND e.category_id = ?";
  if (start_date) countQuery += " AND e.date >= ?";
  if (end_date) countQuery += " AND e.date <= ?";

  console.log(countParams);
  const [countResult] = await pool.execute(countQuery, countParams);
  const total = countResult[0].total;

  res.json({
    success: true,
    data: {
      expenses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    },
  });
});

export { getExpenses };
