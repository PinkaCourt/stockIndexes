import {
  MoexResponseData,
  OrderByMRBC,
  StocksMRBCFull,
} from "containers/Moex/types";
import { OrderByTF, Position } from "containers/Tinkoff/types";
import { HUNDRED_PERCENT } from "./constants";
import { Direction } from "./types";

export const toFloatCapital = (price: number, numberStocks: string) => {
  return parseFloat((price * Number(numberStocks)).toFixed(2));
};

export const weightStocksInPortfolio = (
  capitalization: number,
  price: number = 0,
  numberStocks: string = "0"
) => {
  return parseFloat(
    (
      (toFloatCapital(price, numberStocks) * HUNDRED_PERCENT) /
      capitalization
    ).toFixed(2)
  );
};

export const expectedStocksInPortfolio = (
  //цена одной акции
  capitalization: number,
  weight: number, // MOEX
  stocks: string, //число купленных
  weightInPortfolio: number = 0
) => {
  if (stocks === "0") {
    return capitalization / weight; // поделить на цену  - минус акции уже купленные
  }
  const weightOneStock = weightInPortfolio / Number(stocks);

  return Math.ceil(weight / weightOneStock) - Number(stocks);
};

export const normalizeResponse = ({ columns, data }: MoexResponseData) => {
  let responseArray = [];

  for (let i = 0; i < data.length; i++) {
    let pairsArray = [];

    for (let j = 0; j < columns.length; j++) {
      pairsArray.push([columns[j], data[i][j]]);
    }
    responseArray.push(Object.fromEntries(pairsArray));
  }

  return responseArray;
};

export const normalizeResponseType = ({ metadata }: MoexResponseData) => {
  const pairsTypes = Object.entries(metadata).map(([key, { type }]) => [
    key,
    type,
  ]);

  return Object.fromEntries(pairsTypes);
};

export const getSecurityCapitalization = (price: number, number: number) => {
  return price * number;
};

export const buyAtWishedPortfolio = (
  wishedPortfolio: number,
  weight: number,
  price: number,
  balance: string = "0"
) => {
  return (
    Math.round(((wishedPortfolio * weight) / price) * 0.01) - Number(balance)
  );
};

export function compareFn(
  array: Position[] | StocksMRBCFull[],
  order: OrderByTF | OrderByMRBC,
  direction: Direction
) {
  const copyArray = [...array];

  let result: Position[] | StocksMRBCFull[];

  const orderStr = ["name", "ticker", "shortnames", "isin"];

  if (orderStr.includes(order)) {
    result = Array.prototype.sort.call(copyArray, (a, b) => {
      return a[order] < b[order] ? -1 : a[order] > b[order] ? 1 : 0;
    });
  } else {
    result = Array.prototype.sort.call(copyArray, (a, b) => {
      return Number(a[order]) - Number(b[order]);
    });
  }

  return direction === "asc" ? result : result.reverse();
}

export const revertDirection = {
  asc: "desc",
  desc: "asc",
};
