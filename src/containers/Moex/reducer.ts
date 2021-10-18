import { createReducer } from "@reduxjs/toolkit";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  stocksMRBC: T.MoexStockMap | null;
  allStocksInfo: T.MoexSecuritiesMap | null;
  expectedStocksWeight: T.ExpectedStocksWeight | null;
}

const initState: InitState = {
  stocksMRBC: null,
  allStocksInfo: null,
  expectedStocksWeight: null,
};

export default createReducer(initState, (builder) => {
  builder.addCase(A.setStocksMRBC, (state, { payload }) => {
    state.stocksMRBC = payload;
  });
  builder.addCase(A.setAllStocksInfo, (state, { payload }) => {
    state.allStocksInfo = payload;
  });
  builder.addCase(A.setExpectedStocksWeight, (state, { payload }) => {
    state.expectedStocksWeight = payload;
  });
});
