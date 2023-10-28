import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";
import "./crons/updateCurrencyPrices.cron";

app.listen(config.port, "0.0.0.0", () => {
  console.log(`running on "0.0.0.0":${config.port}`);
});
