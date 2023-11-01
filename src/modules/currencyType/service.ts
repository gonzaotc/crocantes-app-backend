import { requestCoinMarketCap } from "./coinmarketcapo.service";
import { requestCriptoYaARS } from "./criptoya.service";
import { fetchCurrencyTypes, updateCurrencyTypePrice } from "./data";

export const updateCurrencyPrices = async () => {
  try {
    // Get Currency Types
    const currencyTypes = await fetchCurrencyTypes();

    // Get Currency Symbols from the CurencyTypes
    const currencySymbols = currencyTypes.map(currencyType => currencyType.symbol);

    // Get ARS Price from CriptoYa service
    const criptoYaData = await requestCriptoYaARS();

    // Filter the already obtained ARS
    const coinMarketCapSymbols = currencySymbols.filter(symbol => symbol !== "ARS");

    // Get Currency Prices from services
    const coinMarketCapData = await requestCoinMarketCap(coinMarketCapSymbols, "USD");

    // Merge Data
    const data = [...coinMarketCapData, criptoYaData];

    // Update Currency Prices
    data.forEach(async currencyData => {
      // Search Currency Type by Symbol
      const currencyType = currencyTypes.find(
        currencyType => currencyType.symbol === currencyData.symbol
      );
      if (currencyType) {
        await updateCurrencyTypePrice(currencyType.id, currencyData.price);
      }
    });
    console.log("Updated Currency Types Prices Successfully.");
  } catch (error) {
    console.error("Error updating currency prices:", error);
  }
};
