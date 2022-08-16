import { createReducer } from "@reduxjs/toolkit";
import { StockProfileRaw } from "common/types";
import * as A from "./actions";

export interface InitState {
  full: StockProfileRaw | null;
}

const initialState: InitState = {
  full: null,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(A.setFullStockInfo, (state, { payload }) => {
    state.full = payload;
  });
});
