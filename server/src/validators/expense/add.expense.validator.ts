import { coerce, number, object, string } from "zod";

const expenseAddValidator = () => {
  return object({
    user_id: number().positive(),
    category_id: number().positive(),
    amount: number().positive().multipleOf(0.01),
    date: coerce.date(),
    description: string().max(500).optional(),
  });
};

export { expenseAddValidator };
