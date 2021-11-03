import { fetchRequest } from "api/utils";
import { Accounts, Positions, Instruments } from "containers/Tinkoff/types";

const baseURL = "https://api-invest.tinkoff.ru/openapi";

const accounts = "/user/accounts";
const portfolio = "/portfolio";
const stocks = "/market/stocks";

const params = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBrokerAccountId = (token: string) => {
  const url = baseURL + accounts;

  return fetchRequest<Accounts>(url, params(token));
};

export const getPortfolio = (brokerAccountId: string, token: string) => {
  const keyRequest = `?brokerAccountId=${brokerAccountId}`;
  const url = baseURL + portfolio + keyRequest;

  return fetchRequest<Positions>(url, params(token));
};

export const getAllStocks = (token: string) => {
  const url = baseURL + stocks;

  return fetchRequest<Instruments>(url, params(token));
};
