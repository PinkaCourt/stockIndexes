import { fetchRequest } from "api/utils";
import * as T from "containers/Moex/types";

const tradingBoard = "TQBR";
const format = ".json";

const baseURL = "https://iss.moex.com";

const indexURL =
  baseURL + "/iss/statistics/engines/stock/markets/index/analytics/";
const allStockTQBR =
  baseURL +
  `/iss/engines/stock/markets/shares/boards/${tradingBoard}/securities`;

const params: RequestInit = {
  method: "GET",
};

export const getMoexStocks = (indexCode: string) => {
  const url = indexURL + indexCode + format;

  return fetchRequest<T.Analytics>(url, params);
};

export const getMoexAllStocksInfo = () => {
  const url = allStockTQBR + format;

  return fetchRequest<T.Securities>(url, params);
};
