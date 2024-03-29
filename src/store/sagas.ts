import { fork } from "redux-saga/effects";

import tinkoffSaga from "containers/Tinkoff/sagas";
import moexWatcher from "containers/Moex/sagas";
import exchangeRatesWatcher from "containers/exchangeRates/saga";
import sp500Watcher from "containers/SP500/saga";
import stockProfileWatcher from "containers/FullStockInfo/saga";

export default function* initSaga() {
  yield fork(exchangeRatesWatcher);
  yield fork(tinkoffSaga);
  yield fork(moexWatcher);
  yield fork(sp500Watcher);
  yield fork(stockProfileWatcher);
}
