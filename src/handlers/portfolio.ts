import { Request, Response } from "express";
import { calculatePortfolio } from "../modules/portfolio/services";
import { fetchUserSourcesWithCurrenciesAndTypes } from "../modules/source/data";

export const getUserPortfolio = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const userSources = await fetchUserSourcesWithCurrenciesAndTypes(userId);
    if (!userSources) {
      res.status(404).json({ error: "Error at finding User Portfolio: User Sources not found." });
      return;
    }

    const userPortfolio = calculatePortfolio(userSources, userId);

    res.json(userPortfolio);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the portfolio." });
  }
};
