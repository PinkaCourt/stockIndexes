import { fetchRequest } from "api/utils";
import * as T from "containers/Moex/types";

const tradingBoard = "TQBR";
const format = ".json";

const baseURL = "https://iss.moex.com";

const index_IMOEX_URL =
  baseURL +
  "/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100";
const allStockTQBR =
  baseURL +
  `/iss/engines/stock/markets/shares/boards/${tradingBoard}/securities`;

const params: RequestInit = {
  method: "GET",
};

export const getMoexStocks = () => {
  return fetchRequest<T.Analytics>(index_IMOEX_URL, params);
};

export const getMoexAllStocksInfo = () => {
  const url = allStockTQBR + format;

  return fetchRequest<T.Securities>(url, params);
};
