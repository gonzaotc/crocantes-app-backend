import { UserPortfolio } from "./types";
import { ExtendedSource, SourceWithCurrenciesAndTypes } from "../source/types";

export const calculatePortfolio = (
  sources: SourceWithCurrenciesAndTypes[],
  userId: string
): UserPortfolio => {
  const extendedSources: ExtendedSource[] = sources.map(source => {
    const totalBalance = source.currencies.reduce(
      (acc, curr) => acc + curr.amount * curr.currencyType.price,
      0
    );
    return {
      ...source,
      totalBalance,
    };
  });

  const portfolioTotalBalance = extendedSources.reduce((acc, curr) => acc + curr.totalBalance, 0);

  const extendedPortfolioSources = extendedSources.map(source => {
    return {
      ...source,
      portfolioPercentage: (source.totalBalance / portfolioTotalBalance) * 100,
    };
  });

  return {
    userId: userId,
    totalBalance: portfolioTotalBalance,
    extendedSources: extendedPortfolioSources,
  };
};
