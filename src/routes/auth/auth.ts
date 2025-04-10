import { Router } from "express";
import { AuthController } from "../../controllers/Auth/AuthController";
import passport from "passport";
import "./../../strategies/github-strategy";

const authRouter = Router();

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.checkAuth, AuthController.logout);

export default authRouter;
