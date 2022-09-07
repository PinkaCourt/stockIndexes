import { call, fork, put, select, take, takeLatest } from "redux-saga/effects";

import { getStocksNASDAQ, getStocksNYSE } from "api/common";
import { getStocksDE, getDAXindex } from "api/dax";
import { buyAtWishedPortfolio } from "common/utils";
//import { StockScreenerRaw, StockScreenerMap } from "common/types";
import { tinkoffIsDone } from "containers/Tinkoff/actions";
//import { selectEURStocks } from "containers/Tinkoff/selectors";

import { setTFPortfolio } from "containers/Tinkoff/actions";
import { selectUSDPortfolio } from "containers/UserData/selectors";
import { setWishedUsdPortfolio } from "containers/UserData/reducer";
import { setDAXStocks } from "./reducer";
//import { sp500 } from "./data";
import * as T from "./types";
//import { selectStocksUSA } from "./selectors";

function* getDAXStocks() {
  yield take(tinkoffIsDone);
  /*
  const eurStocks: ReturnType<typeof selectEURStocks> = yield select(
    selectEURStocks
  ); // тиньковский вариант без цены и странным тикером
*/
  // console.log(eurStocks);
  const { constituents }: { constituents: string[] } = yield call(getDAXindex);

  console.log("stocksDAX", constituents);
  const stocksDE: T.StockDE[] = yield call(getStocksDE);

  console.log("stocksDE", stocksDE);

  const tot = stocksDE.filter((e) => constituents.includes(e.symbol));
  console.log("tot", tot);

  /*const tot2 = constituents.reduce((acc, cur)=> {
    acc[cur] = stocksDE.;
    return acc
  }, {})*/
  /* const DAXStocksMap = stocksDE.reduce(
    (stockMap, stock) => ({ ...stockMap, [stock.symbol]: stock }),
    {} as T.DAXStocksMap
  );*/
  //yield put(setDAXStocks(DAXStocksMap));
}

export default function* daxWatcher() {
  yield fork(getDAXStocks);
}
