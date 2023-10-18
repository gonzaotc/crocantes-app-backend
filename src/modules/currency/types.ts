import { Currency, CurrencyType } from "@prisma/client";

export interface CurrencyWithType extends Currency {
  currencyType: CurrencyType;
}
