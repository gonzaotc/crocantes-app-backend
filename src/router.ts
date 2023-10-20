import { Router } from "express";
import { createCurrencyType, getCurrencyType, getCurrencyTypes } from "./handlers/currencyType";
import { getUserPortfolio } from "./handlers/portfolio";
import { createSourceType, getSourceType, getSourceTypes } from "./handlers/sourceType";
import { createUserSource, getUserSources } from "./handlers/source";
import { handleInputErrorsMW } from "./middlewares/handleInputErrors";
import { Validator } from "./validators/validators";

const router = Router();

// Portfolio
router.get("/portfolio", getUserPortfolio);

// Sources
router.get("/sources", getUserSources);
router.post("/sources", Validator, handleInputErrorsMW, createUserSource);

// Source Types
router.get("/sourceTypes", getSourceTypes);
router.get("/sourceTypes/:id", Validator.SourceType.read, handleInputErrorsMW, getSourceType);
router.post("/sourceTypes", Validator.SourceType.create, handleInputErrorsMW, createSourceType);

// Currency Types
router.get("/currencyTypes", getCurrencyTypes);
router.get("/currencyTypes/:id", Validator.CurrencyType.read, handleInputErrorsMW, getCurrencyType);
router.get(
  "/currencyTypes/:symbol",
  Validator.CurrencyType.read,
  handleInputErrorsMW,
  getCurrencyType
);
router.post(
  "/currencyTypes",
  Validator.CurrencyType.create,
  handleInputErrorsMW,
  createCurrencyType
);

export default router;
