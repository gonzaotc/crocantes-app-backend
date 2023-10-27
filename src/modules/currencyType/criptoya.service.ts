import { CurrencyPrice } from "./types";
const CRIPTOYA_URL = process.env.CRIPTOYA_URL;

export interface ExchangeData {
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  time: string;
}
export interface CriptoYaResponse {
  [key: string]: ExchangeData;
}

export const requestCriptoYaARS = async (): Promise<CurrencyPrice> => {
  const response = await fetch(`${CRIPTOYA_URL}/USDT/ARS`);
  const responseJson = (await response.json()) as CriptoYaResponse;

  const averageWithComission = calculateAverageValue(responseJson, true);

  const data: CurrencyPrice = {
    symbol: "ARS",
    price: 1 / averageWithComission,
  };

  return data;
};

export const calculateAverageValue = (data: CriptoYaResponse, withComission = false): number => {
  let total = 0;
  let counter = 0;

  for (const key in data) {
    const element = data[key];
    if (withComission) {
      total += element.totalAsk + element.totalBid;
    } else {
      total += element.ask + element.bid;
    }
    counter += 2;
  }
  return total / counter;
};
