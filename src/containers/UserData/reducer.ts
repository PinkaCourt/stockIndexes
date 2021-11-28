import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitState {
  tinkoffToken: string;
  ruPortfolio: number;
  usdPortfolio: number;
  eurPortfolio: number;
}

const initialState: InitState = {
  tinkoffToken: "",
  ruPortfolio: 0,
  usdPortfolio: 0,
  eurPortfolio: 0,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setTinkoffToken(state, { payload }: PayloadAction<string>) {
      return { ...state, tinkoffToken: payload };
    },
    setWishedRuPortfolio(state, { payload }: PayloadAction<number>) {
      return { ...state, ruPortfolio: payload };
    },
    setWishedUsdPortfolio(state, { payload }: PayloadAction<number>) {
      return { ...state, usdPortfolio: payload };
    },
    setWishedEurPortfolio(state, { payload }: PayloadAction<number>) {
      return { ...state, eurPortfolio: payload };
    },
  },
});

export const {
  setTinkoffToken,
  setWishedRuPortfolio,
  setWishedUsdPortfolio,
  setWishedEurPortfolio,
} = userDataSlice.actions;
export default userDataSlice.reducer;
