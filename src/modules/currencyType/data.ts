import { CurrencyType } from "@prisma/client";
import prisma from "../../db";

export const fetchCurrencyTypes = async (): Promise<CurrencyType[] | null> => {
  const currencyTypes = await prisma.currencyType.findMany();
  return currencyTypes;
};

export const fetchCurrencyTypeById = async (id: string): Promise<CurrencyType | null> => {
  const currencyType = await prisma.currencyType.findUnique({
    where: { id },
  });
  return currencyType;
};

export const fetchCurrencyTypeBySymbol = async (symbol: string): Promise<CurrencyType | null> => {
  const currencyType = await prisma.currencyType.findUnique({
    where: { symbol },
  });
  return currencyType;
};
