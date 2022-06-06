import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RUB, USD, EUR } from "common/constants";
export interface initState {
  [RUB]: number;
  [EUR]: number;
  [USD]: number;
}

const initialState: initState = { [RUB]: 1, [EUR]: 0, [USD]: 0 };

const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
  initialState,
  reducers: {
    setExchangeRates(
      state,
      { payload }: PayloadAction<Omit<initState, "rub">>
    ) {
      return { ...state, [EUR]: payload[EUR], [USD]: payload[USD] };
    },
  },
});

export const { setExchangeRates } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
