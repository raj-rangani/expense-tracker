import { RequestHandler } from "express";
import { pool } from "../../configs/database";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

const getCategories: RequestHandler = asyncHandler(async (req, res) => {
  const [categories] = await pool.execute(
    "SELECT * FROM categories ORDER BY name"
  );

  return res.status(200).send(new ApiResponse(200, categories));
});

export { getCategories };
