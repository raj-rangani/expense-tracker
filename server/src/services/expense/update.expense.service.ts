import { RequestHandler } from "express";
import { ResultSetHeader } from "mysql2";
import { coerce } from "zod";
import { pool } from "../../configs/database";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { expenseUpdateValidator } from "../../validators/expense/update.expense.validator";

const updateExpense: RequestHandler = asyncHandler(async (req, res) => {
  const id = coerce.number().positive().parse(req.params.id);
  const body = expenseUpdateValidator().parse(req.body);

  const query = `
        UPDATE expenses 
        SET user_id = ?, category_id = ?, amount = ?, date = ?, description = ?
        WHERE id = ?
    `;

  const [result] = await pool.execute(query, [
    body.user_id,
    body.category_id,
    body.amount,
    body.date,
    body.description,
    id,
  ]);

  if ((result as ResultSetHeader).affectedRows === 0) {
    throw new ApiError(400, "Expense not found");
  }

  // Fetch updated expense
  const [updatedExpense] = await pool.execute(
    `
        SELECT e.*, u.name as user_name, c.name as category_name 
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        JOIN categories c ON e.category_id = c.id
        WHERE e.id = ?
    `,
    [id]
  );

  return res.status(200).send(new ApiResponse(200, updatedExpense));
});

export { updateExpense };
