import { Router } from "express";
import { addExpense } from "../../services/expense/add.expense.service";
import { updateExpense } from "../../services/expense/update.expense.service";
import { deleteExpense } from "../../services/expense/delete.expense.service";
import { getExpenses } from "../../services/expense/get.expense.service";

const expenseRouter: Router = Router();

expenseRouter.route("/").post(addExpense);
expenseRouter.route("/").get(getExpenses);
expenseRouter.route("/:id").put(updateExpense);
expenseRouter.route("/:id").delete(deleteExpense);

export default expenseRouter;
