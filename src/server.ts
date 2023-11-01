import express from "express";
import router from "./router";
import morgan from "morgan";
import { authProtectMW } from "./middlewares/authProtectMiddleware";
import authRouter from "./authRouter";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps or curl requests)
      const allowedOrigins = ["http://localhost", "https://crocantes-app.vercel.app"];
      const isOriginAllowed = allowedOrigins.some(allowedOrigin => {
        return origin.startsWith(allowedOrigin);
      });
      if (isOriginAllowed) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(morgan("dev"));
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

// Eror Handler, Must be implemented in each handler with a next(e) call to delegate the error to this handler.
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
