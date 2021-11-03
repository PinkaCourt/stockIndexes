import { RootState } from "store/store";

export const selectTinkoffToken = (state: RootState) =>
  state.userData.tinkoffToken;
export const selectRuPortfolio = (state: RootState) =>
  state.userData.ruPortfolio;
