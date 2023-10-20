import { Router } from "express";
import { register, signIn } from "./handlers/user";
import { Validator } from "./validators/validators";
import { handleInputErrorsMW } from "./middlewares/handleInputErrors";

const authRouter = Router();

authRouter.post("/auth/register", Validator.User.register, handleInputErrorsMW, register);
authRouter.post("/auth/signin", Validator.User.signin, handleInputErrorsMW, signIn);

export default authRouter;
