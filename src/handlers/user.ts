import { addUser, findUserByEmail } from "../modules/auth/data";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth/service";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await addUser(email, await hashPassword(password));
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    // TODO: Improve error handling detecting the error from the error object.
    res.status(400).json({ message: "Error at registering user. Email already registered." });
  }
};

export const signIn = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await findUserByEmail(email);
    const isValid = await comparePaswords(password, user.passwordHash);

    if (!isValid) {
      req.status(401).json({ message: "Wrong email/password pair." });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    // TODO: Improve error handling detecting the error from the error object.
    req.status(401).json({ message: "Error at logging User. Email not found." });
  }
};
