import config from "./config";
import app from "./server";
import "./crons/updateCurrencyPrices.cron";

app.listen(config.port, () => {
  console.log(`running on http://localhost:${config.port}`);
});
