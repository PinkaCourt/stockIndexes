import { fetchRequest } from "api/utils";
import { Accounts, Positions, Instruments } from "containers/Tinkoff/types";
import {
  INSTRUMENT_STATUS_UNSPECIFIED,
  INSTRUMENT_STATUS_BASE,
} from "common/constants";

const serverURL = "https://invest-public-api.tinkoff.ru/rest";
const V1 = "/tinkoff.public.invest.api.contract.v1";

const baseURL = serverURL + V1;

const services = {
  usersService: {
    getAccounts: ".UsersService/GetAccounts",
    getInfo: ".UsersService/GetInfo",
    getMarginAttributes: ".UsersService/GetMarginAttributes",
    getUserTariff: ".UsersService/GetUserTariff",
  },
  operationsService: {
    getPortfolio: ".OperationsService/GetPortfolio",
  },
  instrumentsService: {
    getShares: ".InstrumentsService/Shares",
    getBonds: ".InstrumentsService/Bonds",
  },
};

const params = (token: string, body: any) => {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return {
    headers: headers,
    method: "post",
    body: JSON.stringify(body),
  };
};

export const getBrokerAccountId = (token: string) => {
  const url = baseURL + services.usersService.getAccounts;

  return fetchRequest<Accounts>(url, params(token, {}));
};

export const getPortfolio = (brokerAccountId: string, token: string) => {
  const url = baseURL + services.operationsService.getPortfolio;

  const body = {
    accountId: brokerAccountId,
  };

  return fetchRequest<Positions>(url, params(token, body));
};

export const getAllStocks = (token: string) => {
  const url = baseURL + services.instrumentsService.getShares;

  return fetchRequest<Instruments>(
    url,
    params(token, {
      instrumentStatus: INSTRUMENT_STATUS_UNSPECIFIED,
    }),
  );
};

export const getAllBonds = (token: string) => {
  const url = baseURL + services.instrumentsService.getBonds;

  return fetchRequest<Instruments>(
    url,
    params(token, {
      instrumentStatus: INSTRUMENT_STATUS_BASE,
    }),
  );
};
