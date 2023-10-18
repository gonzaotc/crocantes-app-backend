import prisma from "../db";
import { comparePaswords, createJWT, hashPassword } from "../modules/auth";

// @TBD To be modularized, separating db data requesting from the handler

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      passwordHash: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  const isValid = await comparePaswords(password, user.passwordHash);

  if (!isValid) {
    req.status(401).json({ message: "Wrong user/password pair." });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
