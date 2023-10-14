import { Request, Response } from "express";
import prisma from "../db";

export const getCurrency = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const currency = await prisma.currency.findUnique({
    where: { symbol: symbol.toUpperCase() },
  });
  res.json(currency);
};

export const getCurrencies = async (req: Request, res: Response) => {
  const currencies = await prisma.currency.findMany();
  res.json(currencies);
};

export const createCurrency = async (req: Request, res: Response) => {
  const { symbol, name } = req.body;

  // Price optionally added at creation time.
  const priceInUsd = req.body.priceInUsd || 0;

  const currency = await prisma.currency.create({
    data: { symbol: symbol.toUpperCase(), name, priceInUsd },
  });
  res.json(currency);
};
