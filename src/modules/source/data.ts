import prisma from "../../db";
import { SourceWithCurrenciesAndTypes } from "./types";
import { CurrencyEntry } from "../currency/types";

export const fetchUserSourcesWithCurrenciesAndTypes = async (
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

export const addUserSource = async (
  userId: string,
  sourceTypeId: string,
  currenciesData: CurrencyEntry[]
): Promise<SourceWithCurrenciesAndTypes | null> => {
  console.log("data eceived sourceTypeId and currenciesData", userId, sourceTypeId, currenciesData);

  const newSource = await prisma.source.create({
    data: {
      userId: userId,
      sourceTypeId: sourceTypeId,
      currencies: {
        create: currenciesData.map(currencyData => ({
          currencyTypeId: currencyData.currencyTypeId,
          amount: currencyData.amount,
        })),
      },
    },
    include: {
      currencies: {
        include: {
          currencyType: true,
        },
      },
    },
  });
  console.log("new source", newSource);
  return newSource;
};
