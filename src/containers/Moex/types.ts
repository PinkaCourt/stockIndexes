export type DataMOEX = Analytics | Securities;
export interface Metadata {
  type: string;
  bytes?: number;
  max_size?: number;
}

export interface MoexResponseData {
  metadata: Metadata;
  columns: string[];
  data: any[];
}
export interface Analytics {
  analytics: MoexResponseData;
}

export interface Securities {
  securities: MoexResponseData;
}

export interface entryMoexIndexStock {
  indexid: string;
  secids: string;
  shortnames: string;
  ticker: string;
  tradedate: string;
  tradingsession: number;
  weight: number;
}

export interface MoexIndexStockInfo {
  SECID: string;
  BOARDID: string;
  SHORTNAME: string;
  PREVPRICE: number;
  LOTSIZE: number;
  FACEVALUE: number;
  STATUS: string;
  BOARDNAME: string;
  DECIMALS: number;
  SECNAME: string;
  REMARKS: string;
  MARKETCODE: string;
  INSTRID: string;
  SECTORID: string;
  MINSTEP: number;
  PREVWAPRICE: number;
  FACEUNIT: string;
  PREVDATE: Date;
  ISSUESIZE: number;
  ISIN: string;
  LATNAME: string;
  REGNUMBER: string;
  PREVLEGALCLOSEPRICE: number;
  PREVADMITTEDQUOTE: number;
  CURRENCYID: string;
  SECTYPE: string;
  LISTLEVEL: number;
  SETTLEDATE: Date;
}

export interface MoexStockMap {
  [key: string]: entryMoexIndexStock;
}

export interface MoexSecuritiesMap {
  [key: string]: MoexIndexStockInfo;
}

export interface StocksMRBCFull extends entryMoexIndexStock {
  isin: string;
  issueSize: number;
  prevPrice: number;
  stockCapitalization: number;
  weightInPortfolio?: number;
  balance?: string;
  toBuy?: number;
}

export interface StocksMRBCFullMap {
  [key: string]: StocksMRBCFull;
}

export interface ExpectedStocksWeight {
  [key: string]: StocksMRBCFull;
}

export type OrderByMRBC =
  | "shortnames"
  | "ticker"
  | "issueSize"
  | "prevPrice"
  | "isin"
  | "stockCapitalization"
  | "weight"
  | "weightInPortfolio"
  | "balance"
  | "toBuy";
