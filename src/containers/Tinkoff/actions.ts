import { createAction } from "@reduxjs/toolkit";

import { Direction } from "common/types";
import * as T from "./types";

export const getTFAccountId = createAction("getTFAccountId");
export const setTFAccountId = createAction<string>("setTFAccountId");

export const getTFPortfolio = createAction<string>("getTFPortfolio");
export const setTFPortfolio = createAction<T.PositionMap>("setTFPortfolio");

export const getAllStocks = createAction("getAllStocks");
export const setAllStocks = createAction<T.InstrumentMap>("setAllStocks");

export const tinkoffIsDone = createAction("tinkoffDone");

export const setDirectionTF = createAction<Direction>("setDirectionTF");
export const setOrderByTF = createAction<T.OrderByTF>("setOrderByTF");

export const setBalanceTF = createAction<T.Balance>("setBalanceTF");
