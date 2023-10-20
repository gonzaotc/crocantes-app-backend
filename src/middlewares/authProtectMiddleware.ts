import jwt from "jsonwebtoken";
import { DecodedToken } from "../modules/auth/types";

export const authProtectMW = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized, authorization header type bearer not provided." });
    return;
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    req.status(401);
    req.json({ message: "not authorized, the proken provided is not valid." });
    return;
  }

  //   const tokenHeader = token.split(".")[0];
  //   const tokenPayload = token.split(".")[1];
  //   const tokenSignature = token.split(".")[2];

  try {
    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("token decoded: ", decoded);
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
