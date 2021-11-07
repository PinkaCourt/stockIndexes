import { createAction } from "@reduxjs/toolkit";

import { Direction } from "common/types";
import * as T from "./types";

export const getStocksMRBC = createAction("getStocksMRBC");
export const setStocksMRBC = createAction<T.MoexStockMap>("setStocksMRBC");

export const getAllStocksInfo = createAction("getAllStocksInfo");
export const setAllStocksInfo =
  createAction<T.MoexSecuritiesMap>("setAllStocksInfo");

export const getExpectedStocksWeight = createAction("getExpectedStocksWeight");
export const setExpectedStocksWeight = createAction<T.ExpectedStocksWeight>(
  "setExpectedStocksWeight"
);

export const setDirectionMRBC = createAction<Direction>("setDirectionTF");
export const setOrderByMRBC = createAction<T.OrderByMRBC>("setOrderByTF");
