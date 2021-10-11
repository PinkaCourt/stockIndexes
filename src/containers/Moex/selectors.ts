import { RootState } from "store/store";

export const selectMOEXstoks = (state: RootState) => state.moex.stocks;

export const selectMoexState = {
  stocks: selectMOEXstoks,
};
