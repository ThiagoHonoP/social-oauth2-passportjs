import express, { json } from "express";
import authRouter from "./routes/auth/auth";
import { connectDB } from "./config/database";
import session from "express-session";
import sessionStore from "./config/sessionStorage";
import dashboardRouter from "./routes/dashboard";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(authRouter);
app.use(dashboardRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
