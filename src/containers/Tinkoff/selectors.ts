import { createSelector } from "reselect";

import { STOCK, RUB, currencyMap } from "common/constants";
import { PortfolioCapitalization, Currency } from "common/types";
import { toFloatCapital, weightStocksInPortfolio } from "common/utils";
import { RootState } from "store/store";
import * as T from "./types";

export const selectTFBrokerAccountId = (state: RootState) =>
  state.tinkoff.brokerAccountId;
export const selectTFPortfolio = (state: RootState) => state.tinkoff.portfolio;
export const selectOrderBy = (state: RootState) => state.tinkoff.orderBy;
export const selectDirection = (state: RootState) => state.tinkoff.direction;

export const selectStockCapitalization = createSelector(
  selectTFPortfolio,
  (securities) => {
    if (!securities) {
      return;
    }
    const allStocks: T.Position[] = Object.values(securities).filter(
      (elem) => elem.instrumentType === STOCK
    );

    return allStocks.reduce(
      (acc, { balance, averagePositionPrice: { currency, value } }) => ({
        ...acc,
        [currency]: acc[currency]
          ? acc[currency] + toFloatCapital(value, balance)
          : toFloatCapital(value, balance),
      }),
      {} as PortfolioCapitalization
    );
  }
);

export const selectRuStocksWithWeigh = createSelector(
  selectTFPortfolio,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities) {
      return;
    }
    const ruStocksCapital = stocksCapital ? stocksCapital.RUB : 0;

    const ruStocks = Object.values(securities).filter(
      (stock) =>
        stock.instrumentType === STOCK &&
        stock.averagePositionPrice.currency === RUB
    );

    const ruStocksWeight = ruStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          ruStocksCapital,
          stock.averagePositionPrice.value,
          stock.balance
        ),
      };
    });

    const ruStocksWeightMap = Object.fromEntries(
      ruStocksWeight.map((stock) => [stock.ticker, stock])
    );

    return ruStocksWeightMap;
  }
);

export const selectSortedTFPortfolio = createSelector(
  [selectTFPortfolio, selectOrderBy, selectDirection],
  (securities, orderBy, direction) => {
    if (!securities) {
      return;
    }

    let result: T.Position[];

    const orderStr = ["name", "ticker"];

    const orderCur = ["expectedYield", "averagePositionPrice"];

    if (orderStr.includes(orderBy)) {
      result = Array.prototype.sort.call(Object.values(securities), (a, b) => {
        if (direction === "asc") {
          return a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
        }

        return a[orderBy] > b[orderBy] ? -1 : a[orderBy] < b[orderBy] ? 1 : 0;
      });
    } else if (orderCur.includes(orderBy)) {
      result = Array.prototype.sort.call(Object.values(securities), (a, b) => {
        const aCurrency: Currency = a[orderBy].currency;
        const bCurrency: Currency = b[orderBy].currency;

        if (direction === "asc") {
          return (
            a[orderBy].value * currencyMap[aCurrency] -
            b[orderBy].value * currencyMap[bCurrency]
          );
        } else {
          return (
            b[orderBy].value * currencyMap[bCurrency] -
            a[orderBy].value * currencyMap[aCurrency]
          );
        }
      });
    } else {
      result = Array.prototype.sort.call(Object.values(securities), (a, b) => {
        if (direction === "asc") {
          return Number(a[orderBy]) - Number(b[orderBy]);
        } else {
          return Number(b[orderBy]) - Number(a[orderBy]);
        }
      });
    }

    return result;
  }
);

export const selectTinkoffState = {
  brokerAccountId: selectTFBrokerAccountId,
  portfolio: selectTFPortfolio,
  portfolioCapitalization: selectStockCapitalization,
  direction: selectDirection,
  orderBy: selectOrderBy,
  sortedTFPortfolio: selectSortedTFPortfolio,
};
