import express from "express";
import router from "./router";
import { protectMiddleware } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

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

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

// Router only applies to the /api path.
app.use("/api", protectMiddleware, router);

// User creation and login are not protected intentionally.
app.post("/user", createNewUser);
app.post("/signin", signIn);

export default app;
