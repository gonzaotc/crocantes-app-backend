import prisma from "../../db";
import { SourceWithCurrenciesAndTypes } from "./types";
import { CurrencyEntry } from "../currency/types";

export const fetchUserSourcesWithCurrenciesAndTypes = async (
  userId: string
): Promise<SourceWithCurrenciesAndTypes[] | null> => {
  const userSources = await prisma.source.findMany({
    where: { userId: userId },
    include: {
      sourceType: true,
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
  return newSource;
};

export const fetchSource = async (sourceId: string) => {
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

export const deleteSource = async (sourceId: string) => {
  const deletedSource = await prisma.source.delete({
    where: { id: sourceId },
  });
  return deletedSource;
};

