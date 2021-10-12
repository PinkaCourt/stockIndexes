import { createSelector } from "reselect";

import { toFloatCapital } from "common/utils";
import { STOCK } from "common/constants";
import { RootState } from "store/store";
import { PortfolioCapitalization } from "common/types";
import * as T from "./types";

export const selectTFBrokerAccountId = (state: RootState) =>
  state.tinkoff.brokerAccountId;
export const selectTFPortfolio = (state: RootState) => state.tinkoff.portfolio;

export const selectStocsCapitalization = createSelector(
  selectTFPortfolio,
  (securities) => {
    if (!securities) {
      return;
    }
    const allStocks: T.Position[] = Object.values(securities).filter(
      (elem) => elem.instrumentType === STOCK
    );

    return allStocks.reduce(
      (acc, { balance, averagePositionPrice: { currency, value } }) => ({
        ...acc,
        [currency]: acc[currency]
          ? acc[currency] + toFloatCapital(value, balance)
          : toFloatCapital(value, balance),
      }),
      {} as PortfolioCapitalization
    );
  }
);

export const selectTinkoffState = {
  brokerAccountId: selectTFBrokerAccountId,
  portfolio: selectTFPortfolio,
  portfolioCapitalization: selectStocsCapitalization,
};
