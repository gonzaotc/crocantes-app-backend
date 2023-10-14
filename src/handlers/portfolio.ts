import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await prisma.portfolio.findMany();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching portfolios." });
  }
};

export const getPortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found." });
    }

    if (portfolio.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this portfolio." });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the portfolio." });
  }
};

export const createPortfolio = async (req: Request, res: Response) => {
  const userId = req.user.id;  
  try {
    const newPortfolio = await prisma.portfolio.create({
      data: {
        userId,
      },
    });
    res.json(newPortfolio);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the portfolio." });
  }
};
