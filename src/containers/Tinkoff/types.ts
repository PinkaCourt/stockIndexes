import { InstrumentType, Currency } from "common/types";

export type Status = "Ok" | "Error";

export interface DataTF {
  trackingId: string;
  payload: Payload;
  status: Status;
}

export type Payload = Accounts | Positions | Instruments | ErrorRes;

export interface Accounts {
  accounts: Account[];
}

export interface Instruments {
  instruments: Instrument[];
}

export interface Positions {
  expectedYield: Yield;
  positions: Position[];
  totalAmountBonds: TotalYield;
  totalAmountCurrencies: TotalYield;
  totalAmountEtf: TotalYield;
  totalAmountFutures: TotalYield;
  totalAmountShares: TotalYield;
}

export interface ErrorRes {
  message: string;
  code: string;
}

export interface Yield {
  nano: number; // -440000000
  units: string; // "-23"
}

export interface TotalYield extends Yield {
  currency: string; // "rub"
}

export interface Account {
  accessLevel: string; //ACCOUNT_ACCESS_LEVEL_READ_ONLY
  closedDate: string; //"1970-01-01T00:00:00Z"
  id: string; //"2079311664"
  name: string; //"ИИС"
  openedDate: string; //"2021-04-10T00:00:00Z"
  status: string; //"ACCOUNT_STATUS_OPEN"
  type: string; //"ACCOUNT_TYPE_TINKOFF_IIS"
}

export interface Position {
  averagePositionPrice: Price;
  averagePositionPriceFifo: Price;
  currentNkd: Price;
  currentPrice: Price;
  expectedYield: Price;
  figi: string; //like BBG000R607Y3
  instrumentType: InstrumentType;
  quantity: Yield;
  quantityLots: Yield;
}

export interface PositionMap {
  [key: string]: Position;
}

export interface InstrumentMap {
  [key: string]: Instrument;
}

export interface Price extends Yield {
  currency: Currency;
}

export interface Instrument {
  figi: string; // BBG000BH0FR6
  ticker: string; // SGEN
  classCode: string; // SPBXM // MOEX
  isin: string; // US81181C1045
  lot: number;
  currency: Currency;
  klong?: Yield;
  kshort?: Yield;
  dlong?: Yield;
  dshort?: Yield;
  dlongMin?: Yield;
  dshortMin?: Yield;
  shortEnabledFlag: boolean;
  name: string;
  exchange: string; // SPB
  ipoDate: string;
  issueSize: string;
  countryOfRisk: string; // RU
  countryOfRiskName: string; // Российская Федерация
  sector: string; // health_care
  issueSizePlan: string;
  nominal: Price;
  tradingStatus: string; // SECURITY_TRADING_STATUS_NORMAL_TRADING
  otcFlag: boolean;
  buyAvailableFlag: boolean;
  sellAvailableFlag: boolean;
  divYieldFlag: boolean;
  shareType: string; // SHARE_TYPE_COMMON // SHARE_TYPE_ADR
  minPriceIncrement: Yield;
  apiTradeAvailableFlag: boolean;
  uid: string;
  realExchange: string; // REAL_EXCHANGE_RTS // REAL_EXCHANGE_MOEX
}

export interface PositionWeight extends Position {
  weightInPortfolio: number;
}

export type OrderByTF = keyof NormalizeStocks;

export interface Balance {
  totalAmountShares: string;
  totalAmountBonds: string;
  totalAmountEtf: string;
  totalAmountCurrencies: string;
  totalAmountFutures: string;
  total: string;
}

export interface NormalizeStocks extends Instrument {
  quantity: string;
  averagePositionPrice: number;
  expectedYield: number;
  currentPrice: number;
}

export interface NormalizeStocksMap {
  [key: string]: NormalizeStocks;
}
