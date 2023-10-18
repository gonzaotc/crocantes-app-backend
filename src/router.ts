import { Router } from "express";
import { getCurrencyType, getCurrencyTypes } from "./handlers/currencyType";
import { getUserPortfolio } from "./handlers/portfolio";

const router = Router();

// Portfolio
router.get("/portfolio", getUserPortfolio);

// Sources

// Currency Types
router.get("/currencyTypes", getCurrencyTypes);
router.get("/currencyTypes/:id", getCurrencyType);
router.get("/currencyTypes/:symbol", getCurrencyType);

export default router;
