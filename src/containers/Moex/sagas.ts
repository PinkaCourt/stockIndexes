import {
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { getMoexStocks, getMoexAllStocksInfo } from "api/moex";
import { normalizeResponse, buyAtWishedPortfolio } from "common/utils";
import { selectRuStocksWithWeigh } from "containers/Tinkoff/selectors";
import { tinkoffIsDone } from "containers/Tinkoff/actions";
import { selectRuPortfolio } from "containers/UserData/selectors";
import { setWishedRuPortfolio } from "containers/UserData/actions";
import * as A from "./actions";
import { selectStocksMRBCFull } from "./selectors";
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
  const { analytics }: T.Analytics = yield call(getMoexStocks);

  const entryMRBCStock: T.entryMoexIndexStock[] = normalizeResponse(analytics);

  const stocksMRBCMap = entryMRBCStock.reduce((accum, current) => {
    accum[current.ticker] = current;
    return accum;
  }, {} as T.MoexStockMap);

  yield put(A.setStocksMRBC(stocksMRBCMap));
  yield put(A.getExpectedStocksWeight());
}

function* displayExpectedStocksWeight() {
  yield take(tinkoffIsDone);

  const ruStocksWithWeigh: ReturnType<typeof selectRuStocksWithWeigh> =
    yield select(selectRuStocksWithWeigh);

  const stocksMRBCFull: ReturnType<typeof selectStocksMRBCFull> = yield select(
    selectStocksMRBCFull
  );

  if (!ruStocksWithWeigh || !stocksMRBCFull) {
    return;
  }

  const ruWishedPortfolio: ReturnType<typeof selectRuPortfolio> = yield select(
    selectRuPortfolio
  );

  const StocksMRBCFullMap = Object.values(stocksMRBCFull).reduce(
    (accum, current) => {
      accum[current.ticker] = {
        ...current,
        weightInPortfolio:
          ruStocksWithWeigh[current.ticker]?.weightInPortfolio || 0,
        balance: ruStocksWithWeigh[current.ticker]?.balance || "0",
        toBuy: buyAtWishedPortfolio(
          ruWishedPortfolio,
          current.weight,
          current.prevPrice,
          ruStocksWithWeigh[current.ticker]?.balance
        ),
      };
      return accum;
    },
    {} as T.ExpectedStocksWeight
  );

  yield put(A.setExpectedStocksWeight(StocksMRBCFullMap));
}

export default function* moexWatcher() {
  yield fork(getAllStocksInfo);
  yield takeEvery(A.getStocksMRBC, getMRBCStocks);
  yield takeLatest(
    [A.getExpectedStocksWeight, setWishedRuPortfolio],
    displayExpectedStocksWeight
  );
}
