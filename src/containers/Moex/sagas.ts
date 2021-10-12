import { call, fork, put, takeEvery } from "redux-saga/effects";

import { getMoexStocks, getMoexAllStocksInfo } from "api/moex";
import { normalizeResponse } from "common/utils";
import * as A from "./actions";
import { MOEX15 } from "./constants";
import * as T from "./types";

function* getAllStocksInfo() {
  const { securities }: T.Securities = yield call(getMoexAllStocksInfo);

  const allSecuritiesMoexInfo: T.MoexIndexStockInfo[] =
    normalizeResponse(securities);

  const MoexSecuritiesMap = allSecuritiesMoexInfo.reduce((accum, current) => {
    accum[current.SECID] = current;
    return accum;
  }, {} as T.MoexSecuritiesMap);

  yield put(A.setAllStocksInfo(MoexSecuritiesMap));
  yield put(A.getStocksMRBC());
}

function* getMRBCStocks() {
  const { analytics }: T.Analytics = yield call(getMoexStocks, MOEX15);

  const entryMRBCStock: T.entryMoexIndexStock[] = normalizeResponse(analytics);

  const stocksMRBCMap = entryMRBCStock.reduce((accum, current) => {
    accum[current.ticker] = current;
    return accum;
  }, {} as T.MoexStockMap);

  yield put(A.setStocksMRBC(stocksMRBCMap));
}

export default function* moexWatcher() {
  yield fork(getAllStocksInfo);
  yield takeEvery(A.getStocksMRBC, getMRBCStocks);
}
