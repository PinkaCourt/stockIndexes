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
  | typeof constants.CURRENCY;

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
