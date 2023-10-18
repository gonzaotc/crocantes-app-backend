import { Source } from "@prisma/client";
import { CurrencyWithType } from "../currency/types";

export interface SourceWithCurrenciesAndTypes extends Source {
  currencies: CurrencyWithType[];
}

export interface ExtendedSource extends SourceWithCurrenciesAndTypes {
  totalBalance: number;
}

export interface ExtendedPortfolioSource extends ExtendedSource {
  portfolioPercentage: number;
}
