import { ExtendedPortfolioSource } from "../source/types";

export interface UserPortfolio {
  userId: string;
  totalBalance: number;
  extendedSources: ExtendedPortfolioSource[];
}
