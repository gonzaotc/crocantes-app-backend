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

export const addCurrencyType = async (
  symbol: string,
  name: string,
  price?: number
): Promise<CurrencyType | null> => {
  const currencyType = await prisma.currencyType.create({
    data: { symbol, name, price }, // If the price is not passed, Prisma will set it to null, and default to 0 on the DB.
  });
  return currencyType;
};
