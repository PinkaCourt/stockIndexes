import { createAction } from "@reduxjs/toolkit";
import * as T from "./types";

export const getTFAccountId = createAction("getTFAccountId");
export const setTFAccountId = createAction<string>("setTFAccountId");

export const getTFPortfolio = createAction<string>("getTFPortfolio");
export const setTFPortfolio = createAction<T.PositionMap>("setTFPortfolio");

export const A = createAction("A");

export const B = createAction("B");
