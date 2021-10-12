import { fork } from "redux-saga/effects";

import tinkoffSaga from "containers/Tinkoff/sagas";
import moexWatcher from "containers/Moex/sagas";

export default function* initSaga() {
  yield fork(tinkoffSaga);
  yield fork(moexWatcher);
}
