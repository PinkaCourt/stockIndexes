import { createReducer } from "@reduxjs/toolkit";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  brokerAccountId: string;
  portfolio: T.PositionMap | null;
  allStocks: T.InstrumentMap | null;
}

const initState: InitState = {
  brokerAccountId: "",
  portfolio: null,
  allStocks: null,
};

export default createReducer(initState, (builder) => {
  builder.addCase(A.setTFAccountId, (state, { payload }) => {
    state.brokerAccountId = payload;
  });
  builder.addCase(A.setTFPortfolio, (state, { payload }) => {
    state.portfolio = payload;
  });
  builder.addCase(A.setAllStocks, (state, { payload }) => {
    state.allStocks = payload;
  });
});
