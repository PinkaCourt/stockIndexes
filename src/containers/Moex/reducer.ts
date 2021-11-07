import { createReducer } from "@reduxjs/toolkit";

import { Direction } from "common/types";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  stocksMRBC: T.MoexStockMap | null;
  allStocksInfo: T.MoexSecuritiesMap | null;
  expectedStocksWeight: T.ExpectedStocksWeight | null;
  direction: Direction;
  orderBy: T.OrderByMRBC;
}

const initState: InitState = {
  stocksMRBC: null,
  allStocksInfo: null,
  expectedStocksWeight: null,
  direction: "asc",
  orderBy: "shortnames",
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
  builder.addCase(A.setDirectionMRBC, (state, { payload }) => {
    state.direction = payload;
  });
  builder.addCase(A.setOrderByMRBC, (state, { payload }) => {
    state.orderBy = payload;
  });
});
