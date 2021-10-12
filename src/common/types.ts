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
