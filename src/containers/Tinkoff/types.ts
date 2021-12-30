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
  total: number;
}

export interface Positions {
  positions: Position[];
}

export interface ErrorRes {
  message: string;
  code: string;
}

export interface Account {
  brokerAccountType: string;
  brokerAccountId: string;
}

export interface Security {
  figi: string;
  ticker: string;
  isin: string;
  name: string;
}
export interface Position extends Security {
  instrumentType: InstrumentType;
  balance: string;
  lots: string;
  expectedYield: Price;
  averagePositionPrice: Price;
}

export interface PositionMap {
  [key: string]: Position;
}

export interface InstrumentMap {
  [key: string]: Instrument;
}

export interface Price {
  currency: Currency;
  value: number;
}

export interface Instrument extends Security {
  currency: Currency;
  lot: string;
  minPriceIncrement: number;
  type: InstrumentType;
}

export interface PositionWeight extends Position {
  weightInPortfolio: number;
}

export type OrderByTF = keyof Position;
