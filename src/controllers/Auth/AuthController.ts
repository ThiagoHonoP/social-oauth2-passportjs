import { NextFunction, Request, Response } from "express";
import AuthSchema from "../../schemas/AuthUser";

declare module "express-session" {
  interface SessionData {
    user?: {
      name: string;
      email: string;
      password: string;
      createdAt?: Date;
    };
  }
}
export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({ email, password });

    try {
      if (user) {
        req.session.user = {
          name: user.name,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
        };
      }
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }

    return res.json({ email, password });
  }

  static checkAuth(req: Request, res: Response, next: NextFunction): any {
    if ((req.session && req.session.user) || req.isAuthenticated()) {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized not found token" });
    }
  }

  static logout(req: Request, res: Response): any {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.json({ message: "Logout" });
  }
}
