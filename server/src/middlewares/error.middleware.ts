import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  if (err instanceof ZodError) {
    const messages = err.issues.map((el) => el.message);
    err = new ApiError(400, messages[0], messages, err.stack);
  }

  const response = {
    ...err,
    message: err.message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  };

  return res.status((err as ApiError).statusCode).json(response);
}

export { errorHandler };
