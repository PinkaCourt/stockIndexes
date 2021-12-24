import { fetchRequest } from "api/utils";
import { RawRates, StockScreenerRaw } from "common/types";

const baseURLExchangeRates = "https://www.cbr-xml-daily.ru/daily_json.js";

export const getExchangeRates = () => {
  return fetchRequest<RawRates>(baseURLExchangeRates);
};

const baseURLStockScreener =
  "https://financialmodelingprep.com/api/v3/stock-screener?";
const TOKEN = "d436d494b581048e94f7391c30ebc049";
const marketCapMin = "1000000000";

// stock exchanges
const NASDAQ = "NASDAQ";
const EURONEXT = "EURONEXT"; // Frankfurt / Paris / MCE / Brussels
const NYSE = "NYSE";

//countries
const US = "US";

export const getStocksNASDAQ = () => {
  const url =
    baseURLStockScreener +
    `marketCapMoreThan=${marketCapMin}&exchange=${NASDAQ}&apikey=${TOKEN}&isEtf=false&isActivelyTrading=true`;
  return fetchRequest<StockScreenerRaw[]>(url);
};

export const getStocksNYSE = () => {
  const url =
    baseURLStockScreener +
    `marketCapMoreThan=${marketCapMin}&exchange=${NYSE}&apikey=${TOKEN}&isEtf=false&isActivelyTrading=true`;
  return fetchRequest<StockScreenerRaw[]>(url);
};
