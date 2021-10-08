import { tokenTinkoff } from "tokens";
import { fetchRequest } from "api/utils";
import { Accounts, Positions, Instruments } from "containers/Tinkoff/types";

const baseURL = "https://api-invest.tinkoff.ru/openapi";

const accounts = "/user/accounts";
const portfolio = "/portfolio";
const stocks = "/market/stocks";

const params: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${tokenTinkoff}`,
  },
};

export const getBrokerAccountId = () => {
  const url = baseURL + accounts;

  return fetchRequest<Accounts>(url, params);
};

export const getPortfolio = (brokerAccountId: string) => {
  const keyRequest = `?brokerAccountId=${brokerAccountId}`;
  const url = baseURL + portfolio + keyRequest;

  return fetchRequest<Positions>(url, params);
};

export const getAllStocks = () => {
  const url = baseURL + stocks;

  return fetchRequest<Instruments>(url, params);
};
