import { Request, Response } from "express";
import { fetchUserSources } from "../modules/source/data";
import { calculatePortfolio } from "../modules/portfolio/services";

export const getUserPortfolio = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const userSources = await fetchUserSources(userId);
    if (!userSources) {
      res.status(404).json({ error: "Error at finding User Portfolio: User Sources not found." });
      return;
    }
    console.log("UserSources found for user", userId, ": ", userSources);

    const userPortfolio = calculatePortfolio(userSources, userId);

    console.log("Portfolio generate for the user", userId, ": ", userPortfolio);
    res.json(userPortfolio);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the portfolio." });
  }
};
