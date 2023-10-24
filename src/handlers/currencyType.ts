import { Request, Response } from "express";

import {
  addCurrencyType,
  fetchCurrencyTypeById,
  fetchCurrencyTypeBySymbol,
  fetchCurrencyTypes,
} from "../modules/currencyType/data";

export const getCurrencyType = async (req: Request, res: Response) => {
  const { symbol, id } = req.params;

  const CurrencyType = await fetchCurrencyTypeById(id);

  res.json(CurrencyType);
};

export const getCurrencyTypes = async (req: Request, res: Response) => {
  const currencies = fetchCurrencyTypes();
  res.json(currencies);
};

// Note: currently anyone can create a currency type, as this endpoint is public.
export const createCurrencyType = async (req: Request, res: Response) => {
  const { symbol, name, price } = req.body;

  const CurrencyType = await addCurrencyType(symbol, name, price);
  res.json(CurrencyType);
};
