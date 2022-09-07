import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Direction, StockScreenerMap } from "common/types";
import * as T from "./types";

export interface initState {
  //stocksEU: StockScreenerMap | null;
  stocksDAX40: any; //T.DAXStocksMap | null;
  direction: Direction;
  // orderBy: T.OrderBySP500;
}

const initialState: initState = {
  //stocksEU: null,
  stocksDAX40: null,
  direction: "desc",
  // orderBy: "weight",
};

const daxSlice = createSlice({
  name: "dax",
  initialState,
  reducers: {
    /* setAllEUStocksMap(state, { payload }: PayloadAction<StockScreenerMap>) {
      state.stocksEU = payload;
    },*/
    setDAXStocks(
      state,
      { payload }: PayloadAction<any> //DAXStocksMap
    ) {
      state.stocksDAX40 = payload;
    },
    setDirectionDAX(state, { payload }: PayloadAction<Direction>) {
      state.direction = payload;
    },
    /* setOrderByDAX(state, { payload }: PayloadAction<T.OrderBySP500>) {
      state.orderBy = payload;
    },*/
  },
});

export const {
  // setAllEUStocksMap,
  setDAXStocks,
  setDirectionDAX,
  // setOrderByDAX,
} = daxSlice.actions;

export default daxSlice.reducer;
