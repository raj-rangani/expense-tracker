import { RequestHandler } from "express";
import { ResultSetHeader } from "mysql2";
import { coerce } from "zod";
import { pool } from "../../configs/database";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

const deleteExpense: RequestHandler = asyncHandler(async (req, res) => {
  const id = coerce.number().positive().parse(req.params.id);
  const [result] = await pool.execute("DELETE FROM expenses WHERE id = ?", [
    id,
  ]);

  if ((result as ResultSetHeader).affectedRows === 0) {
    throw new ApiError(400, "Expense not found");
  }

  return res.status(204).send(204);
});

export { deleteExpense };
