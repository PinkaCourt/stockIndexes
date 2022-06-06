import { call, fork, put, select, take, takeLatest } from "redux-saga/effects";

import { getStocksNASDAQ, getStocksNYSE } from "api/common";
import { buyAtWishedPortfolio } from "common/utils";
import { StockScreenerRaw, StockScreenerMap } from "common/types";
import { selectUSDStocksWithWeigh } from "containers/Tinkoff/selectors";
import { setTFPortfolio } from "containers/Tinkoff/actions";
import { selectUSDPortfolio } from "containers/UserData/selectors";
import { setWishedUsdPortfolio } from "containers/UserData/reducer";
import { setSP500Stocks, setAllUSAStocksMap } from "./reducer";
import { sp500 } from "./data";
import * as T from "./types";
import { selectStocksUSA } from "./selectors";

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

function* getSP500Stocks() {
  yield take(setTFPortfolio);

  const USDStocksWithWeigh: ReturnType<typeof selectUSDStocksWithWeigh> =
    yield select(selectUSDStocksWithWeigh);

  const stocksUSA: ReturnType<typeof selectStocksUSA> = yield select(
    selectStocksUSA
  );

  const usdWishedPortfolio: ReturnType<typeof selectUSDPortfolio> =
    yield select(selectUSDPortfolio);

  if (!USDStocksWithWeigh || !stocksUSA) {
    return;
  }

  const stocksMap = sp500.reduce(
    (acc, stock) => ({
      ...acc,
      [stock.symbol]: {
        ...stock,
        sector: stocksUSA[stock.symbol]?.sector || "",
        industry: stocksUSA[stock.symbol]?.industry || "",
        lastPrice: stocksUSA[stock.symbol]?.price.toFixed(2) || "0",
        lastAnnualDividend:
          stocksUSA[stock.symbol]?.lastAnnualDividend.toFixed(2) || "0",
        volume: stocksUSA[stock.symbol]?.volume || 0,
        weightInPortfolio:
          USDStocksWithWeigh[stock.symbol]?.weightInPortfolio || 0,
        isin: USDStocksWithWeigh[stock.symbol]?.isin || "",
        balance: USDStocksWithWeigh[stock.symbol]?.quantity || "0",
        toBuy: buyAtWishedPortfolio(
          usdWishedPortfolio,
          Number(stock.weight),
          stocksUSA[stock.symbol]?.price,
          USDStocksWithWeigh[stock.symbol]?.quantity
        ),
      },
    }),
    {} as T.SP500StocksMap
  );

  yield put(setSP500Stocks(stocksMap));
}

export default function* sp500Watcher() {
  yield fork(getAllUSAStocksInfo);
  yield takeLatest([setAllUSAStocksMap, setWishedUsdPortfolio], getSP500Stocks);
}
