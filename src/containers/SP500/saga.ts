import { call, fork, put } from "redux-saga/effects";
import { getStocksNASDAQ, getStocksNYSE } from "api/common";
import { StockScreenerRaw, StockScreenerMap } from "common/types";
import { setAllUSAStocksMap } from "./reducer";

function* getAllUSAStocksInfo() {
  const billionStocksNASDAQ: StockScreenerRaw[] = yield call(getStocksNASDAQ);
  const billionStocksNYSE: StockScreenerRaw[] = yield call(getStocksNYSE);

  const billionStocksUSA = [...billionStocksNASDAQ, ...billionStocksNYSE];

  if (!billionStocksUSA) {
    return;
  }

  const billionStocksUSAMap = billionStocksUSA.reduce(
    (stockMap, stock) => ({ ...stockMap, [stock.symbol]: stock }),
    {} as StockScreenerMap
  );

  yield put(setAllUSAStocksMap(billionStocksUSAMap));
}

export default function* sp500Watcher() {
  yield fork(getAllUSAStocksInfo);
}
