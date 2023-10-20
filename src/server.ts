import express from "express";
import router from "./router";
import { authProtectMW } from "./middlewares/authProtectMiddleware";
import authRouter from "./authRouter";
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Router only applies to the /api path.
app.use("/api", authProtectMW, router);

// User creation and login are public intentionally.
app.use("api/auth", authRouter);

export default app;
