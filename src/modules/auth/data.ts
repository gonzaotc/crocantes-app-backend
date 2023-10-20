import prisma from "../../db";

export const addUser = async (email, passwordHash) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      passwordHash: passwordHash,
    },
  });

  return user;
};

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
