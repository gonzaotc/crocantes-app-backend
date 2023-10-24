import { Request, Response } from "express";
import {
  addUserSource,
  fetchSource,
  fetchUserSourcesWithCurrenciesAndTypes,
  deleteSource,
} from "../modules/source/data";
import {
  addCurrenciesToSourceOps,
  deleteCurrencyOps,
  executeTransaction,
  updateCurrencyOps,
} from "../modules/source/operations";

export const getUserSources = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const userSourcesWithCurrenciesAndTypes = await fetchUserSourcesWithCurrenciesAndTypes(userId);
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

export const deleteUserSource = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const source = await fetchSource(id);

    if (!source) {
      res.status(404).json({ error: "Error at deleting Source: Source not found." });
      return;
    }
    if (source.userId !== userId) {
      res.status(403).json({
        error: "Error at deleting Source: User does not have permission to delete this Source.",
      });
      return;
    }

    await deleteSource(id);
    res.json({ message: "Source deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the source." });
  }
};

export const updateUserSource = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id: sourceId } = req.params;
  const { newCurrencies, updatedCurrencies, deletedCurrencies } = req.body;

  try {
    const source = await fetchSource(sourceId);

    if (!source) {
      res.status(404).json({ error: "Error at updating Source: Source not found." });
      return;
    }

    if (source.userId !== userId) {
      res.status(403).json({
        error: "Error at updating Source: User does not have permission to update this Source.",
      });
      return;
    }

    const operations = [];

    if (newCurrencies && newCurrencies.length) {
      operations.push(...addCurrenciesToSourceOps(sourceId, newCurrencies));
    }

    if (updatedCurrencies && updatedCurrencies.length) {
      operations.push(...updateCurrencyOps(updatedCurrencies));
    }

    if (deletedCurrencies && deletedCurrencies.length) {
      operations.push(...deleteCurrencyOps(deletedCurrencies));
    }

    await executeTransaction(operations);

    const updatedSource = await fetchSource(sourceId);
    res.json(updatedSource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the source." });
  }
};
