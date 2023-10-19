import { Request, Response } from "express";
import { addUserSource, fetchUserSourcesWithCurrenciesAndTypes } from "../modules/source/data";

export const getUserSources = async (req: Request, res: Response) => {
  const { userId } = req.user.id;
  try {
    const userSourcesWithCurrenciesAndTypes = fetchUserSourcesWithCurrenciesAndTypes(userId);
    if (!userSourcesWithCurrenciesAndTypes) {
      res.status(404).json({ error: "Error at finding User Sources: User Sources not found." });
      return;
    }
    res.json(userSourcesWithCurrenciesAndTypes);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching the sources." });
  }
};

export const createUserSource = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { sourceTypeId, currenciesData } = req.body;

  try {
    const newUserSource = await addUserSource(userId, sourceTypeId, currenciesData);
    if (!newUserSource) {
      res.status(404).json({ error: "Error at creating User Source: User Source not found." });
      return;
    }
    res.json(newUserSource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the source." });
  }
};
