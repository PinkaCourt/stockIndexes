import { fetchRequest } from "api/utils";
import { RawRates } from "common/types";

const baseURL = "https://www.cbr-xml-daily.ru/daily_json.js";

export const getExchangeRates = () => {
  return fetchRequest<RawRates>(baseURL);
};
