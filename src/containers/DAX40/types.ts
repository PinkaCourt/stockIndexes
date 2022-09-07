export interface StockDE {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string | null;
  mic: string;
  symbol: string;
  symbol2: string;
  type: string;
}
/*
export interface SP500RawStock {
  company: string;
  symbol: string;
  weight: string;
}
*/
/*
export interface SP500Stock extends StockDE {
  sector?: string;
  industry?: string;
  lastAnnualDividend?: string;
  volume?: number;
  isin?: string;
  lastPrice?: string;
  weightInPortfolio?: number;
  balance?: string;
  toBuy?: number;
}*/

export interface DAXStocksMap {
  [key: string]: StockDE;
}

export type OrderBySP500 = keyof StockDE;
