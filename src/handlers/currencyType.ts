import { Request, Response } from "express";

import {
  addCurrencyType,
  fetchCurrencyTypeById,
  fetchCurrencyTypeBySymbol,
  fetchCurrencyTypes,
} from "../modules/currencyType/data";

export const getCurrencyType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const CurrencyType = await fetchCurrencyTypeById(id);

    res.json(CurrencyType);
  } catch (e) {
    res.status(500).json({ error: "An error occurred while fetching the Currency Type." });
  }
};

export const getCurrencyTypes = async (req: Request, res: Response) => {
  try {
    const currencies = fetchCurrencyTypes();
    res.json(currencies);
  } catch (e) {
    res.status(500).json({ error: "An error occurred while fetching the Currency Types." });
  }
};

// Note: currently anyone can create a currency type, as this endpoint is public.
export const createCurrencyType = async (req: Request, res: Response) => {
  const { symbol, name, price } = req.body;
  try {
    const CurrencyType = await addCurrencyType(symbol, name, price);
    res.json(CurrencyType);
  } catch (e) {
    res.status(500).json({ error: "An error occurred while creating the Currency Type." });
  }
};
