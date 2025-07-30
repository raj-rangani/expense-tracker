import { Router } from "express";
import { getTopDaysByUser } from "../../services/statistics/top.days.statistics.service";
import { getMonthlyChange } from "../../services/statistics/monthly.change.statistics.service";
import { getPredictions } from "../../services/statistics/predictions.statistics.service";

const statisticsRouter: Router = Router();

statisticsRouter.route("/top-days").get(getTopDaysByUser);
statisticsRouter.route("/monthly-change").get(getMonthlyChange);
statisticsRouter.route("/predictions").get(getPredictions);

export default statisticsRouter;
