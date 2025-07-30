import { coerce, number, object, string } from "zod";

const expenseGetValidator = () => {
  return object({
    user_id: coerce.number().positive().optional(),
    category_id: coerce.number().positive().optional(),
    start_date: coerce.date().optional(),
    end_date: coerce.date().optional(),
    page: coerce.number().positive().default(1),
    limit: coerce.number().positive().default(10),
  });
};

export { expenseGetValidator };
