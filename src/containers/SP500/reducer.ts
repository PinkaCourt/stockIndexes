import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Direction, StockScreenerMap } from "common/types";
import * as T from "./types";

export interface initState {
  stocksUSA: StockScreenerMap | null;
  direction: Direction;
  orderBy: T.OrderBySP500;
}

const initialState: initState = {
  stocksUSA: null,
  direction: "desc",
  orderBy: "weight",
};

const sp500Slice = createSlice({
  name: "sp500",
  initialState,
  reducers: {
    setAllUSAStocksMap(state, { payload }: PayloadAction<StockScreenerMap>) {
      state.stocksUSA = payload;
    },
    setDirectionSP500(state, { payload }: PayloadAction<Direction>) {
      state.direction = payload;
    },
    setOrderBySP500(state, { payload }: PayloadAction<T.OrderBySP500>) {
      state.orderBy = payload;
    },
  },
});

export const { setAllUSAStocksMap, setDirectionSP500, setOrderBySP500 } =
  sp500Slice.actions;
export default sp500Slice.reducer;
