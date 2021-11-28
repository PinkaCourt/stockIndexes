export interface SP500RawStock {
  company: string;
  symbol: string;
  weight: string;
}
export interface SP500Stock extends SP500RawStock {
  sector?: string;
  industry?: string;
  lastAnnualDividend?: string;
  volume?: number;
  isin?: string;
  lastPrice?: string;
  weightInPortfolio?: number;
  balance?: string;
  toBuy?: number;
}

export interface SP500StocksMap {
  [key: string]: SP500Stock;
}

export type OrderBySP500 = keyof SP500Stock;
