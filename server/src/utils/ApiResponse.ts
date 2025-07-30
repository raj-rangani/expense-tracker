class ApiResponse {
  success: boolean;
  count?: number;
  data?: {};

  constructor(statusCode: number, data?: {}, count?: number) {
    this.data = data;
    this.success = statusCode < 400 ? true : false;
    this.count = count;
  }
}

export { ApiResponse };
