import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

interface DecodedToken {
  id: number;
  username: string;
  iat: number;
}

/**
 * @param {string} password - password to be compared
 * @param {string} hashedPassword - hashed password to compare with
 * @returns {boolean} - true if passwords match, false if not
 * @note - The hashing phase should happen in the client and be received in this module.
 * Thus here we would only find the user by username and compare the passwords.
 */
export const comparePaswords = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

/**
 * @param {string} password - password to be hashed
 * @returns {string} - hashed password
 * @note - The hashing phase should happen in the client and be received in this module.
 */
export const hashPassword = async password => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * @param {object} user - user object
 * @returns {string} - JWT token
 */
export const createJWT = user => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  return token;
};

export const protectMiddleware = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    req.status(401);
    req.json({ message: "not authorized" });
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
