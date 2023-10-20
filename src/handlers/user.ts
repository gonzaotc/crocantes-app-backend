import { addUser, findUserByEmail } from "../modules/auth/data";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth/service";

export const createNewUser = async (req, res) => {
  const user = await addUser(req.body.email, await hashPassword(req.body.password));
  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const password = req.body.password;

  const user = await findUserByEmail(req.body.email);
  const isValid = await comparePaswords(password, user.passwordHash);

  if (!isValid) {
    req.status(401).json({ message: "Wrong user/password pair." });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
