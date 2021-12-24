import { createSelector } from "reselect";

import { RootState } from "store/store";

export const selectStocksUSA = (state: RootState) => state.sp500.stocksUSA;
export const selectStocksSP500 = (state: RootState) => state.sp500.stocksSP500;
export const selectOrderBy = (state: RootState) => state.sp500.orderBy;
export const selectDirection = (state: RootState) => state.sp500.direction;

export const selectSortedStocksSP500 = createSelector(
  [selectStocksSP500, selectOrderBy, selectDirection],
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
