import { fork } from "redux-saga/effects";

import tinkoffSaga from "containers/Tinkoff/sagas";

export default function* initSaga() {
  yield fork(tinkoffSaga);
}
