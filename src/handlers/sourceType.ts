import { Request, Response } from "express";

import { addSourceType, fetchSourceType, fetchSourceTypes } from "../modules/sourceType/data";

export const getSourceTypes = async (req: Request, res: Response) => {
  try {
    const sourceTypes = await fetchSourceTypes();

    if (!sourceTypes) {
      res.status(404).json({ error: "Source Types not found." });
      return;
    }

    res.json(sourceTypes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the source types." });
  }
};

export const getSourceType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sourceType = await fetchSourceType(id);
    if (!sourceType) {
      res.status(404).json({ error: "Source Type not found." });
      return;
    }

    res.json(sourceType);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the source type." });
  }
};

export const createSourceType = async (req: Request, res: Response) => {
  const { name, symbol, url } = req.body;
  try {
    const sourceType = await addSourceType(name, symbol, url);
    res.json(sourceType);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the source type." });
  }
};
