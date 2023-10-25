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
app.use("/auth", authRouter);

// Error handler
// Must be implemented in each handler with a next(e) call to delegate the error to this handler.
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Uncached Server Error: ", err.stack);

  // Here could be implemented a better error handling from a list of known errors.
  // if ((err.type = "auth")) {
  //   res.status(401).json({ message: "Unauthorized Error" });
  // } else if (err.type === "input") {
  //   res.status(400).json({ message: "invalid input" });
  // } else {
  //   res.status(500).json({ message: "Unknown Server Error" });
  // }

  res.status(500).json({ message: "Unknown Server Error" });
});
export default app;
