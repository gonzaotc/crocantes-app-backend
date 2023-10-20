import express from "express";
import router from "./router";
import { createNewUser, signIn } from "./handlers/user";
import { authProtectMW } from "./middlewares/authProtectMiddleware";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Implement any custom middleware here.
// app.use((req, res, next) => {
//   req.secret = "doggy";
//   next();
// });

// Router only applies to the /api path.
app.use("/api", authProtectMW, router);

// User creation and login are not protected intentionally.
app.post("/user", createNewUser);
app.post("/signin", signIn);

export default app;
