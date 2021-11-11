import { fork } from "redux-saga/effects";

import tinkoffSaga from "containers/Tinkoff/sagas";
import moexWatcher from "containers/Moex/sagas";
import exchangeRatesWatcher from "containers/exchangeRates/saga";

export default function* initSaga() {
  yield fork(exchangeRatesWatcher);
  yield fork(tinkoffSaga);
  yield fork(moexWatcher);
}
