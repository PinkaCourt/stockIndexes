import { createSelector } from "reselect";
import { buyAtWishedPortfolio } from "common/utils";
import { RootState } from "store/store";
import { selectUSDStocksWithWeigh } from "containers/Tinkoff/selectors";
import { selectUSDPortfolio } from "containers/UserData/selectors";
import { sp500 } from "./data";
import { SP500StocksMap } from "./types";

export const selectStocksUSA = (state: RootState) => state.sp500.stocksUSA;
export const selectOrderBy = (state: RootState) => state.sp500.orderBy;
export const selectDirection = (state: RootState) => state.sp500.direction;

export const selectUSAStocksWeightMap = createSelector(
  selectStocksUSA,
  selectUSDStocksWithWeigh,
  selectUSDPortfolio,
  (stocksUSA, stocksTINKOFF, usaWished) => {
    if (!stocksUSA || !stocksTINKOFF) {
      return;
    }

    const stocksMap = sp500.reduce(
      (acc, stock) => ({
        ...acc,
        [stock.symbol]: {
          ...stock,
          sector: stocksUSA[stock.symbol]?.sector || "",
          industry: stocksUSA[stock.symbol]?.industry || "",
          lastPrice: stocksUSA[stock.symbol]?.price.toFixed(2) || "0",
          lastAnnualDividend:
            stocksUSA[stock.symbol]?.lastAnnualDividend.toFixed(2) || "0",
          volume: stocksUSA[stock.symbol]?.volume || 0,
          weightInPortfolio:
            stocksTINKOFF[stock.symbol]?.weightInPortfolio || 0,
          isin: stocksTINKOFF[stock.symbol]?.isin || "",
          balance: stocksTINKOFF[stock.symbol]?.quantity || "0",
          toBuy: buyAtWishedPortfolio(
            usaWished,
            Number(stock.weight),
            stocksUSA[stock.symbol]?.price,
            stocksTINKOFF[stock.symbol]?.quantity
          ),
        },
      }),
      {} as SP500StocksMap
    );

    return stocksMap;
  }
);

export const selectSortedStocksSP500 = createSelector(
  [selectUSAStocksWeightMap, selectOrderBy, selectDirection],
  (securities, orderBy, direction) => {
    if (!securities) {
      return;
    }

    const orderStr = ["company", "symbol", "isin"];

    return Object.values(securities).sort((a, b) => {
      let left = a,
        right = b;

      if (direction === "desc") {
        left = b;
        right = a;
      }

      if (orderStr.includes(orderBy)) {
        return (left[orderBy] as string).localeCompare(
          right[orderBy] as string
        );
      }

      return Number(left[orderBy]) - Number(right[orderBy]);
    });
  }
);
