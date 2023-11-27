import { UserPortfolio } from "./types";
import { ExtendedSource, SourceWithCurrenciesAndTypes } from "../source/types";

export const calculatePortfolio = (
  sources: SourceWithCurrenciesAndTypes[],
  userId: string
): UserPortfolio => {

  const sourcesWithSortedCurrencies = sources.map(source => {
    const sortedCurrencies = source.currencies.sort(
      (a, b) => b.amount * b.currencyType.price - a.amount * a.currencyType.price
    );
    return {
      ...source,
      currencies: sortedCurrencies,
    };
  }
  );

  const extendedSources: ExtendedSource[] = sourcesWithSortedCurrencies.map(source => {
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

  const sortedPortfolioSources = extendedPortfolioSources.sort(
    (a, b) => b.portfolioPercentage - a.portfolioPercentage
  );

  return {
    userId: userId,
    totalBalance: portfolioTotalBalance,
    extendedSources: sortedPortfolioSources,
  };
};
