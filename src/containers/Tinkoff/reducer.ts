import { createReducer } from "@reduxjs/toolkit";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  brokerAccountId: string;
  portfolio: T.Position[];
}

const initState: InitState = {
  brokerAccountId: "",
  portfolio: [],
};

export default createReducer(initState, (builder) => {
  builder.addCase(A.setTFAccountId, (state, { payload }) => {
    state.brokerAccountId = payload;
  });
  builder.addCase(A.setTFPortfolio, (state, { payload }) => {
    state.portfolio = payload;
  });
});
