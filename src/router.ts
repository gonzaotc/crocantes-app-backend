import { Router } from "express";
import { createCurrencyType, getCurrencyType, getCurrencyTypes } from "./handlers/currencyType";
import { getUserPortfolio } from "./handlers/portfolio";
import { createSourceType, getSourceType, getSourceTypes } from "./handlers/sourceType";
import { createUserSource, getUserSources } from "./handlers/source";

const router = Router();

// Portfolio
router.get("/portfolio", getUserPortfolio);

// Source Types
router.get("/sourceTypes", getSourceTypes);
router.get("/sourceTypes/:id", getSourceType);
router.post("/sourceTypes", createSourceType);

// Sources
router.get("/sources", getUserSources);
router.post("/sources", createUserSource);

// Currency Types
router.get("/currencyTypes", getCurrencyTypes);
router.get("/currencyTypes/:id", getCurrencyType);
router.get("/currencyTypes/:symbol", getCurrencyType);
router.post("/currencyTypes", createCurrencyType);

export default router;
