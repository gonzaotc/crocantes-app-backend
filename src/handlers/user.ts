import prisma from "../db";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const password = req.body.password;

  // Get User on DB through Prisma, based on the email.
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  // user object contains the hashed password.
  const isValid = await comparePaswords(password, user.password);

  if (!isValid) {
    res.status(401);
    req.json({ message: "Wrong user/password pair." });
    return;
  }

  // Then create a token
  const token = createJWT(user);
  res.json({ token });
};
