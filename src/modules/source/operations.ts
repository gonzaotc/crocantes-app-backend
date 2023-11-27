import prisma from "../../db";
import { CurrencyEntry, UpdateCurrencyEntry } from "../currency/types";

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

export const updateCurrencyOps = (updatedCurrencies: UpdateCurrencyEntry[]) => {
  return updatedCurrencies.map((currency) => {

    const dataToUpdate: {
      amount?: number,
      apy?: number,
      apr?: number,
    } = {}

    if (currency.amount !== undefined) {
      dataToUpdate.amount = currency.amount;
    }
    if (currency.apy !== undefined) {
      dataToUpdate.apy = currency.apy;
    }
    if (currency.apr !== undefined) {
      dataToUpdate.apr = currency.apr;
    }

    return prisma.currency.update({
      where: { id: currency.id },
      data: dataToUpdate,
    });
  });
};

export const deleteCurrencyOps = (currencyIds: string[]) => {
  return [prisma.currency.deleteMany({ where: { id: { in: currencyIds } } })];
};

// Batch operations to avoid inconsistent data on the DB.
export const executeTransaction = async (operations: any[]) => {
  await prisma.$transaction(operations);
};
