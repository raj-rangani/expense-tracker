import { RequestHandler } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { expenseAddValidator } from "../../validators/expense/add.expense.validator";
import { pool } from "../../configs/database";
import { ApiResponse } from "../../utils/ApiResponse";
import { ResultSetHeader } from "mysql2";

const addExpense: RequestHandler = asyncHandler(async (req, res) => {
  const body = expenseAddValidator().parse(req.body);
  const query = `
            INSERT INTO expenses (user_id, category_id, amount, date, description)
            VALUES (?, ?, ?, ?, ?)
        `;

  const [result] = await pool.execute(query, [
    body.user_id,
    body.category_id,
    body.amount,
    body.date,
    body.description ?? null,
  ]);

  // Fetch the created expense with joined data
  const [newExpense] = await pool.execute(
    `
            SELECT e.*, u.name as user_name, c.name as category_name 
            FROM expenses e
            JOIN users u ON e.user_id = u.id
            JOIN categories c ON e.category_id = c.id
            WHERE e.id = ?
        `,
    [(result as ResultSetHeader).insertId]
  );

  return res.status(201).json(new ApiResponse(201, newExpense));
});

export { addExpense };
