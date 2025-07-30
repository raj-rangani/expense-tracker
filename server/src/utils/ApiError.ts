class ApiError extends Error {
  statusCode: number;
  message: string;
  success: boolean;
  errors: string[];
  stack?: string | undefined;

  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors: string[] = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
