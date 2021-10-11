import { Position } from "containers/Tinkoff/types";

export interface Stok {
  name: string;
  ticker: string;
  weight: string;
}

export interface StokMoex extends Stok, Position {
  weightInPortfolio?: number;
  bye?: number;
}

export interface StokMap {
  [key: string]: StokMoex;
}
