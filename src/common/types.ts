import * as constants from "./constants";

export type PortfolioCapitalization = {
  [key in
    | typeof constants.RUB
    | typeof constants.EUR
    | typeof constants.USD]: number;
};

export type InstrumentType =
  | typeof constants.STOCK
  | typeof constants.BOND
  | typeof constants.ETF
  | typeof constants.CURRENCY
  | typeof constants.SHARE;

export type Currency =
  | typeof constants.RUB
  | typeof constants.EUR
  | typeof constants.USD;

export interface Route {
  path: string;
  exact: boolean;
  label: string;
  component: () => JSX.Element | null;
}

export interface Routes {
  [key: string]: Route;
}

export type Direction = "asc" | "desc";

export interface RateInfo {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

export interface RawRates {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: {
    [key: string]: RateInfo;
  };
}

export interface StockScreenerRaw {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
  country: string;
  isEtf: boolean;
  isActivelyTrading: boolean;
}

export interface StockProfileRaw {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: string;
  isAdr: boolean;
  isFund: boolean;
}

export interface StockScreenerMap {
  [key: string]: StockScreenerRaw;
}

const sectorEnum = {
  "Communication Services": "Communication Services",
  Technology: "Technology",
  "Consumer Cyclical": "Consumer Cyclical",
  "Financial Services ": "Financial Services",
  Healthcare: "Healthcare",
  "Consumer Defensive": "Consumer Defensive",
  //   Healthcare: "Healthcare",
};
