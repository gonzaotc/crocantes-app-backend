import { addUser, findUserByEmail } from "../modules/auth/data";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth/service";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await addUser(email, await hashPassword(password));
  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const { password, email } = req.body;

  const user = await findUserByEmail(email);
  const isValid = await comparePaswords(password, user.passwordHash);

  if (!isValid) {
    req.status(401).json({ message: "Wrong user/password pair." });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
