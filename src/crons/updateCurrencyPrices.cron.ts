import cron from "node-cron";
import { updateCurrencyPrices } from "../modules/currencyType/service";

const updateCurrecyPricesCron = async () => {
  console.log("Updating Currency Types Prices...", new Date());
  await updateCurrencyPrices();
};

// Run at server start
updateCurrecyPricesCron();

// Running each 5 minutes.
console.log("[CRON] Running UpdateCurrencyPrices each 5 minutes...");
cron.schedule("*/5 * * * *", updateCurrecyPricesCron);
