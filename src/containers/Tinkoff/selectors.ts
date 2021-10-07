//import { createSelector, createStructuredSelector } from "reselect";

import { RootState } from "store/store";

export const selectTFBrokerAccountId = (state: RootState) =>
  state.tinkoff.brokerAccountId;
export const selectTFPortfolio = (state: RootState) => state.tinkoff.portfolio;

export const selectTinkoffState = {
  brokerAccountId: selectTFBrokerAccountId,
  portfolio: selectTFPortfolio,
};
