import { CurrencyPrice } from "./types";
const API_KEY = process.env.COINMARKETCAP_API_KEY;
const COINMARKETCAP_URL = process.env.COINMARKETCAP_URL;

interface QuoteData {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  last_updated: string;
}
interface Quote {
  [key: string]: QuoteData;
}

interface CoinMarketCapResponseStatus {
  timestamp: string;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: null;
}

interface CoinMarketCapResponseData {
  [key: string]: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: string;
    tags: string[];
    max_supply: number;
    circulating_supply: number;
    total_supply: number;
    is_active: number;
    infinite_supply: boolean;
    platform: null;
    cmc_rank: number;
    is_fiat: number;
    self_reported_circulating_supply: null;
    self_reported_market_cap: null;
    tvl_ratio: null;
    last_updated: string;
    quote: Quote;
  };
}

interface CoinMarketCapResponse {
  status: CoinMarketCapResponseStatus;
  data: CoinMarketCapResponseData;
}

export const requestCoinMarketCap = async (
  symbol: string[],
  convert: string
): Promise<CurrencyPrice[]> => {
  const response = await fetch(
    `${COINMARKETCAP_URL}/cryptocurrency/quotes/latest?symbol=${symbol.join(
      ","
    )}&convert=${convert}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    }
  );
  const responseJson = (await response.json()) as CoinMarketCapResponse;
  const data = responseJson.data;

  const currenciesData: CurrencyPrice[] = [];

  Object.keys(data).forEach(symbol => {
    const quote = data[symbol].quote;
    currenciesData.push({
      symbol: symbol,
      price: quote.USD.price, // Interested on USD Quote
    });
  });

  return currenciesData;
};
