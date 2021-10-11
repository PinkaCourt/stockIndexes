import { createReducer } from "@reduxjs/toolkit";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  stocks: T.StokMap | null;
}

const initState: InitState = {
  stocks: null,
};

export default createReducer(initState, (builder) => {
  builder.addCase(A.setStoksMap, (state, { payload }) => {
    state.stocks = payload;
  });
});
