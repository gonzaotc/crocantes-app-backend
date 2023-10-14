import { Router } from "express";
import { createCurrency, getCurrencies, getCurrency } from "./handlers/currency";

const router = Router();

// Currency
router.get("/currency", getCurrencies);
router.get("/currency/:symbol", getCurrency);
// router.put("/currency/:symbol", updateCurrency);
router.post("/currency", createCurrency);
// router.delete("/currency/:symbol", deleteCurrency);


// @ TO BE DEVELOPED:

// CurrencyBalance 
// router.get("/currencybalance", getCurrencyBalances);
// router.get("/currencybalance/:id", getCurrencyBalance);
// router.put("/currencybalance/:id", updateCurrencyBalance);
// router.post("/currencybalance", createCurrencyBalance);
// router.delete("/currencybalance/:id", deleteCurrencyBalance);

// Portfolio
// router.get("/portfolio", getPortfolios);
// router.get("/portfolio/:id", getPortfolio);
// router.put("/portfolio/:id", updatePortfolio);
// router.post("/portfolio", createPortfolio);
// router.delete("/portfolio/:id", deletePortfolio);


export default router;
