import { Router } from "express";
import { getUsers } from "../../services/user/get.user.service";

const userRouter: Router = Router();
userRouter.route("/").get(getUsers);
export default userRouter;
