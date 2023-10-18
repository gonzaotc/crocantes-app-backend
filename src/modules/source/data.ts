import prisma from "../../db";
import { SourceWithCurrenciesAndTypes } from "./types";

export const fetchUserSources = async (
  userId: string
): Promise<SourceWithCurrenciesAndTypes[] | null> => {
  const userSources = await prisma.source.findMany({
    where: { userId: userId },
    include: {
      currencies: {
        include: {
          currencyType: true,
        },
      },
    },
  });
  return userSources;
};
