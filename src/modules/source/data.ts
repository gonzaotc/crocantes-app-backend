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
  console.log(userSources);
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

export const fetchSource = async (sourceId: string) => {
  console.log("fetching with id", sourceId);
  const source = await prisma.source.findUnique({
    where: { id: sourceId },
    include: {
      currencies: {
        include: {
          currencyType: true,
        },
      },
      user: true,
    },
  });
  return source;
};

export const removeUserSource = async (sourceId: string) => {
  const deletedSource = await prisma.source.delete({
    where: { id: sourceId },
  });
};
