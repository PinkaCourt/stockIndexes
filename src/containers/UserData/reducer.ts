import { createReducer } from "@reduxjs/toolkit";

import { setTinkoffToken, setWishedRuPortfolio } from "./actions";

export interface InitState {
  tinkoffToken: string;
  ruPortfolio: number;
}

const initState: InitState = {
  tinkoffToken: "",
  ruPortfolio: 0,
};

export default createReducer(initState, (builder) => {
  builder.addCase(setTinkoffToken, (state, { payload }) => {
    state.tinkoffToken = payload;
  });
  builder.addCase(setWishedRuPortfolio, (state, { payload }) => {
    state.ruPortfolio = payload;
  });
});
