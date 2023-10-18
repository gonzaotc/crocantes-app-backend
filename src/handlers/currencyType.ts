import { Request, Response } from "express";
import prisma from "../db";
import {
  fetchCurrencyTypeById,
  fetchCurrencyTypeBySymbol,
  fetchCurrencyTypes,
} from "../modules/currencyType/data";

export const getCurrencyType = async (req: Request, res: Response) => {
  const { symbol, id } = req.params;

  if (!symbol && !id) {
    res.status(400).json({
      error: "Either symbol or id must be provided.",
    });
    return;
  }

  const CurrencyType = symbol
    ? await fetchCurrencyTypeById(id)
    : await fetchCurrencyTypeBySymbol(symbol);

  res.json(CurrencyType);
};

export const getCurrencyTypes = async (req: Request, res: Response) => {
  const currencies = fetchCurrencyTypes();
  res.json(currencies);
};

// Note: currently anyone can create a currency type, as this endpoint is public.
export const createCurrencyType = async (req: Request, res: Response) => {
  const { symbol, name } = req.body;

  // Price optionally added at creation time.
  const price = req.body.price || 0;

  const CurrencyType = await prisma.currencyType.create({
    data: { symbol: symbol.toUpperCase(), name, price },
  });
  res.json(CurrencyType);
};
