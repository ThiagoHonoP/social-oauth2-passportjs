import { Request, Response, Router } from "express";
import { AuthController } from "../../controllers/Auth/AuthController";

const dashboardRouter = Router();

dashboardRouter.get(
  "/dashboard",
  AuthController.checkAuth,
  (req: Request, res: Response): any => {
    return res.json({ message: "Dashboard" });
  }
);

export default dashboardRouter;
