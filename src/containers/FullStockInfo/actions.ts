import { createAction } from "@reduxjs/toolkit";
import { StockProfileRaw } from "common/types";

export const getFullStockInfo = createAction<string>("getFullStockInfo");

export const setFullStockInfo =
  createAction<StockProfileRaw>("setFullStockInfo");
