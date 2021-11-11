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

export interface Position {
  figi: string; //like BBG000R607Y3
  ticker: string; //like PLZL
  isin: string; //like RU000A0JNAA8
  instrumentType: InstrumentType;
  balance: string; //like 10
  lots: string; //like 1
  expectedYield: Price;
  averagePositionPrice: Price; // + or -
  name: string; //like Полюс Золото
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

export interface Instrument extends Position {
  minPriceIncrement: number; //like 0.01
  lot: number; //like 1
  type: string; // instrumentType
}

export interface PositionWeight extends Position {
  weightInPortfolio: number;
}

export type OrderByTF = keyof Position;
