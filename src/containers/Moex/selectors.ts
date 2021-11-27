import { createSelector } from "reselect";

import { getSecurityCapitalization } from "common/utils";
import { RootState } from "store/store";
import { StocksMRBCFullMap } from "./types";

export const selectStocksMRBC = (state: RootState) => state.moex.stocksMRBC;
export const selectAllStocksInfo = (state: RootState) =>
  state.moex.allStocksInfo;
export const selectExpectedStocksWeight = (state: RootState) =>
  state.moex.expectedStocksWeight;
export const selectOrderBy = (state: RootState) => state.moex.orderBy;
export const selectDirection = (state: RootState) => state.moex.direction;

export const selectStocksMRBCFull = createSelector(
  selectStocksMRBC,
  selectAllStocksInfo,
  (stocks, stockInfo) => {
    if (!stocks || !stockInfo) {
      return;
    }

    const StocksMRBCFullMap = Object.values(stocks).reduce((accum, current) => {
      accum[current.ticker] = {
        ...current,
        isin: stockInfo[current.ticker]?.ISIN || "",
        issueSize: stockInfo[current.ticker]?.ISSUESIZE || 0,
        prevPrice: stockInfo[current.ticker]?.PREVPRICE || 0,
        stockCapitalization: getSecurityCapitalization(
          stockInfo[current.ticker]?.PREVPRICE,
          stockInfo[current.ticker]?.ISSUESIZE
        ),
      };
      return accum;
    }, {} as StocksMRBCFullMap);

    return StocksMRBCFullMap;
  }
);

export const selectSortedStocksMRBC = createSelector(
  [selectExpectedStocksWeight, selectOrderBy, selectDirection],
  (securities, orderBy, direction) => {
    if (!securities) {
      return;
    }

    const orderStr = ["shortnames", "ticker", "isin"];

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

export const selectMoexState = {
  stocksMRBC: selectStocksMRBC,
  allStocksInfo: selectAllStocksInfo,
  stocksMRBCFull: selectStocksMRBCFull,
  direction: selectDirection,
  orderBy: selectOrderBy,
  sortedStocksMRBC: selectSortedStocksMRBC,
};
