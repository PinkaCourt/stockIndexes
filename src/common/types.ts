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
