import prisma from "../../db";
import { CurrencyEntry } from "../currency/types";

export const addCurrenciesToSourceOps = (sourceId: string, newCurrencies: CurrencyEntry[]) => {
  return newCurrencies.map(currency => {
    return prisma.currency.create({
      data: {
        ...currency,
        sourceId: sourceId,
      },
    });
  });
};

export const updateCurrencyOps = (updatedCurrencies: { id: string; amount: number }[]) => {
  return updatedCurrencies.map(currency => {
    return prisma.currency.update({
      where: { id: currency.id },
      data: { amount: currency.amount },
    });
  });
};

export const deleteCurrencyOps = (currencyIds: string[]) => {
  return [prisma.currency.deleteMany({ where: { id: { in: currencyIds } } })];
};

export const executeTransaction = async (operations: any[]) => {
  await prisma.$transaction(operations);
};
