import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

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
