import { RootState } from "store/store";

export const selectRates = (state: RootState) => state.exchangeRates;
