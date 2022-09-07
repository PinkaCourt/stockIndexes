import { fetchRequest } from "api/utils";
import { StockDE } from "containers/DAX40/types";

const baseURL = "https://finnhub.io/api/v1/";
const TOKEN = "c5n5guaad3ido15tr8og";

export const getDAXindex = () => {
  const url = baseURL + `index/constituents?symbol=^GDAXI&token=${TOKEN}`;
  return fetchRequest<string[]>(url);
};

export const getStocksDE = () => {
  const url =
    baseURL +
    `stock/symbol?exchange=DE&securityType=Common Stock&token=${TOKEN}`;
  return fetchRequest<StockDE[]>(url);
};
