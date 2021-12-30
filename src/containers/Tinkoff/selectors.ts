import { createSelector } from "reselect";

import { STOCK, RUB, USD, EUR } from "common/constants";
import { PortfolioCapitalization, Currency } from "common/types";
import { toFloatCapital, weightStocksInPortfolio } from "common/utils";
import { selectRates } from "containers/exchangeRates/selectors";
import { RootState } from "store/store";
import * as T from "./types";

export const selectTFBrokerAccountId = (state: RootState) =>
  state.tinkoff.brokerAccountId;
export const selectTFPortfolio = (state: RootState) => state.tinkoff.portfolio;
export const selectAllStocks = (state: RootState) => state.tinkoff.allStocks;
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

export const selectUSDStocksWithWeigh = createSelector(
  selectTFPortfolio,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities) {
      return;
    }
    const usdStocksCapital = stocksCapital ? stocksCapital.USD : 0;

    const usdStocks = Object.values(securities).filter(
      (stock) =>
        stock.instrumentType === STOCK &&
        stock.averagePositionPrice.currency === USD
    );

    const usdStocksWeight = usdStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          usdStocksCapital,
          stock.averagePositionPrice.value,
          stock.balance
        ),
      };
    });

    const usdStocksWeightMap = Object.fromEntries(
      usdStocksWeight.map((stock) => [stock.ticker, stock])
    );

    return usdStocksWeightMap;
  }
);

export const selectEURStocksWithWeigh = createSelector(
  selectTFPortfolio,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities) {
      return;
    }
    const eurStocksCapital = stocksCapital ? stocksCapital.EUR : 0;

    const eurStocks = Object.values(securities).filter(
      (stock) =>
        stock.instrumentType === STOCK &&
        stock.averagePositionPrice.currency === EUR
    );

    const eurStocksWeight = eurStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          eurStocksCapital,
          stock.averagePositionPrice.value,
          stock.balance
        ),
      };
    });

    const eurStocksWeightMap = Object.fromEntries(
      eurStocksWeight.map((stock) => [stock.ticker, stock])
    );

    return eurStocksWeightMap;
  }
);

export const selectSortedTFPortfolio = createSelector(
  [selectTFPortfolio, selectOrderBy, selectDirection, selectRates],
  (securities, orderBy, direction, rates) => {
    if (!securities) {
      return;
    }

    return Object.values(securities).sort((a, b) => {
      let left = a,
        right = b;

      if (direction === "desc") {
        left = b;
        right = a;
      }

      if (orderBy === "name" || orderBy === "ticker") {
        return left[orderBy].localeCompare(right[orderBy]);
      }

      if (orderBy === "expectedYield" || orderBy === "averagePositionPrice") {
        const currencyL: Currency = left[orderBy].currency;
        const currencyR: Currency = right[orderBy].currency;

        return (
          Number(left[orderBy].value * rates[currencyL]) -
          Number(right[orderBy].value * rates[currencyR])
        );
      }

      return Number(left[orderBy]) - Number(right[orderBy]);
    });
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
