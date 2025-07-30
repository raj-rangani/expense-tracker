import { Router } from "express";
import { getCategories } from "../../services/category/get.category.service";

const categoryRouter: Router = Router();
categoryRouter.route("/").get(getCategories);
export default categoryRouter;
