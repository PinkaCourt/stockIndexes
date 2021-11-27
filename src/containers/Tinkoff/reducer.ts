import { createReducer } from "@reduxjs/toolkit";

import { Direction } from "common/types";
import * as A from "./actions";
import * as T from "./types";

export interface InitState {
  brokerAccountId: string;
  portfolio: T.PositionMap | null;
  allStocks: T.InstrumentMap | null;
  direction: Direction;
  orderBy: T.OrderByTF;
}

const initState: InitState = {
  brokerAccountId: "",
  portfolio: null,
  allStocks: null,
  direction: "asc",
  orderBy: "name",
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
  builder.addCase(A.setDirectionTF, (state, { payload }) => {
    state.direction = payload;
  });
  builder.addCase(A.setOrderByTF, (state, { payload }) => {
    state.orderBy = payload;
  });
});
