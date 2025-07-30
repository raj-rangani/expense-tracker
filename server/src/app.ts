import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

import expenseRouter from "./routes/expense/expense.routes";
import statisticsRouter from "./routes/statistics/statistics.routes";
import userRouter from "./routes/user/user.routes";
import categoryRouter from "./routes/category/category.routes";

app.use("/api/expenses", expenseRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);

app.use(errorHandler);

export default app;
