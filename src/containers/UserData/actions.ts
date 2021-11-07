import { createAction } from "@reduxjs/toolkit";

export const setTinkoffToken = createAction<string>("setTinkoffToken");
export const setWishedRuPortfolio = createAction<number>(
  "setWishedRuPortfolio"
);
