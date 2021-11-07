import { createSelector } from "reselect";

import { STOCK, RUB } from "common/constants";
import { PortfolioCapitalization } from "common/types";
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

export const selectTinkoffState = {
  brokerAccountId: selectTFBrokerAccountId,
  portfolio: selectTFPortfolio,
  portfolioCapitalization: selectStockCapitalization,
  direction: selectDirection,
  orderBy: selectOrderBy,
};
