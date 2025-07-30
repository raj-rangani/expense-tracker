import { RequestHandler } from "express";
import { pool } from "../../configs/database";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

const getUsers: RequestHandler = asyncHandler(async (req, res) => {
  const [users] = await pool.execute(
    'SELECT * FROM users WHERE status = "active" ORDER BY name'
  );

  return res.status(200).send(new ApiResponse(200, users));
});

export { getUsers };
