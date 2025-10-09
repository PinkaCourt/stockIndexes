import { createSelector } from "reselect";

import { RUB, USD, EUR } from "common/constants";
import { Currency } from "common/types";
import { toFloatCapital, weightStocksInPortfolio } from "common/utils";
import { selectRates } from "containers/exchangeRates/selectors";
import { RootState } from "store/store";
import * as T from "./types";

export const selectTFBrokerAccountId = (state: RootState) =>
  state.tinkoff.brokerAccountId;
export const selectTFPortfolio = (state: RootState) => state.tinkoff.portfolio;
export const selectOrderBy = (state: RootState) => state.tinkoff.orderBy;
export const selectDirection = (state: RootState) => state.tinkoff.direction;
export const selectAllStocks = (state: RootState) => state.tinkoff.allStocks;
export const selectAllBonds = (state: RootState) => state.tinkoff.allTinkBonds;
//todo! selectTFPortfolio - это бумаги из портфеля, а selectAllStocks это все инструменты которые есть в тиньке
export const selectNormalizeStocks = createSelector(
  selectTFPortfolio,
  selectAllStocks,
  (securities, stocks) => {
    if (!securities || !stocks) {
      return;
    }

    const filteredStocks: T.Instrument[] = Object.values(stocks).filter(
      (elem) => Object.keys(securities).includes(elem.figi),
    );

    return filteredStocks.reduce(
      (accum, current) => ({
        ...accum,
        [current.ticker]: {
          ...current,
          quantity: securities[current.figi].quantity.units,
          averagePositionPrice: Number(
            securities[current.figi].averagePositionPrice.units,
          ),
          expectedYield: Number(securities[current.figi].expectedYield.units),
          currentPrice: Number(securities[current.figi].currentPrice.units),
        },
      }),
      {} as T.NormalizeStocksMap,
    );
  },
);

export const selectNormalizeBonds = createSelector(
  selectTFPortfolio,
  selectAllBonds,
  (securities, bonds) => {
    if (!securities || !bonds) {
      return;
    }

    const filteredBonds: T.Instrument[] = Object.values(bonds).filter((elem) =>
      Object.keys(securities).includes(elem.figi),
    );

    return filteredBonds.reduce(
      (accum, current) => ({
        ...accum,
        [current.ticker]: {
          ...current,
          quantity: securities[current.figi].quantity.units,
          averagePositionPrice: Number(
            securities[current.figi].averagePositionPrice.units,
          ),
          expectedYield: Number(securities[current.figi].expectedYield.units),
          currentPrice: Number(securities[current.figi].currentPrice.units),
        },
      }),
      {} as T.NormalizeStocksMap,
    );
  },
);

export const selectStockCapitalization = createSelector(
  selectNormalizeStocks,
  (securities) => {
    if (!securities) {
      return;
    }

    const allStocks: T.NormalizeStocks[] = Object.values(securities);

    return allStocks.reduce(
      (acc, { quantity, averagePositionPrice, currency }) => ({
        ...acc,
        [currency]: acc[currency]
          ? acc[currency] + toFloatCapital(averagePositionPrice, quantity)
          : toFloatCapital(averagePositionPrice, quantity),
      }),
      // TODO to fix type
      {} as any, // PortfolioCapitalization
    );
  },
);

export const selectRuStocksWithWeigh = createSelector(
  selectNormalizeStocks,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities || !stocksCapital) {
      return;
    }

    const ruStocksCapital = stocksCapital ? stocksCapital[RUB] : 0;

    const ruStocks = Object.values(securities).filter(
      (stock) => stock.currency === RUB,
    );

    const ruStocksWeight = ruStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          ruStocksCapital,
          stock.averagePositionPrice,
          stock.quantity,
        ),
      };
    });

    const ruStocksWeightMap = Object.fromEntries(
      ruStocksWeight.map((stock) => [stock.ticker, stock]),
    );

    return ruStocksWeightMap;
  },
);

export const selectUSDStocksWithWeigh = createSelector(
  selectNormalizeStocks,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities) {
      return;
    }
    const usdStocksCapital = stocksCapital ? stocksCapital[USD] : 0;

    const usdStocks = Object.values(securities).filter(
      (stock) => stock.currency === USD,
    );

    const usdStocksWeight = usdStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          usdStocksCapital,
          stock.averagePositionPrice,
          stock.quantity,
        ),
      };
    });

    const usdStocksWeightMap = Object.fromEntries(
      usdStocksWeight.map((stock) => [stock.ticker, stock]),
    );

    return usdStocksWeightMap;
  },
);

export const selectEURStocksWithWeigh = createSelector(
  selectNormalizeStocks,
  selectStockCapitalization,
  (securities, stocksCapital) => {
    if (!securities) {
      return;
    }
    const eurStocksCapital = stocksCapital ? stocksCapital[EUR] : 0;

    const eurStocks = Object.values(securities).filter(
      (stock) => stock.currency === EUR,
    );

    const eurStocksWeight = eurStocks.map((stock) => {
      return {
        ...stock,
        weightInPortfolio: weightStocksInPortfolio(
          eurStocksCapital,
          stock.averagePositionPrice,
          stock.quantity,
        ),
      };
    });

    const eurStocksWeightMap = Object.fromEntries(
      eurStocksWeight.map((stock) => [stock.ticker, stock]),
    );

    return eurStocksWeightMap;
  },
);

export const selectSortedTFPortfolio = createSelector(
  [selectNormalizeStocks, selectOrderBy, selectDirection, selectRates],
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
        const currencyL: Currency = left.currency;
        const currencyR: Currency = right.currency;

        return (
          Number(left[orderBy] * rates[currencyL]) -
          Number(right[orderBy] * rates[currencyR])
        );
      }

      return Number(left[orderBy]) - Number(right[orderBy]);
    });
  },
);

export const ruStocksTotal = createSelector(
  [selectNormalizeStocks],
  (securities) => {
    if (!securities) {
      return;
    }

    const ruStocks = Object.values(securities).filter(
      (sec) => sec.countryOfRisk === "RU",
    );

    return ruStocks.reduce(
      (total, stock) => {
        return stock.currentPrice * Number(stock.quantity) + total; //это текущая цена на количество всех акций(с учетом лотов)
      },

      0,
    );
  },
);

export const ruBondsTotal = createSelector([selectNormalizeBonds], (bonds) => {
  if (!bonds) {
    return;
  }

  const ruBonds = Object.values(bonds).filter(
    (bond) => bond.countryOfRisk === "RU",
  );

  return ruBonds.reduce((total, bond) => {
    return bond.currentPrice * Number(bond.quantity) + total; //это текущая цена на количество всех акций(с учетом лотов)
  }, 0);
});

export const selectTinkoffState = {
  brokerAccountId: selectTFBrokerAccountId,
  portfolio: selectNormalizeStocks, // selectTFPortfolio
  portfolioCapitalization: selectStockCapitalization,
  direction: selectDirection,
  orderBy: selectOrderBy,
  sortedTFPortfolio: selectSortedTFPortfolio,
  ruStocksTotal: ruStocksTotal,
  ruBondsTotal: ruBondsTotal,
};
