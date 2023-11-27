import { Currency, CurrencyType } from "@prisma/client";

export interface CurrencyWithType extends Currency {
  currencyType: CurrencyType;
}

export interface CurrencyEntry {
  currencyTypeId: string;
  amount?: number;
  apy?: number;
  apr?: number;
}

export interface UpdateCurrencyEntry {
  id: string;
  amount?: number;
  apy?: number;
  apr?: number;
}
