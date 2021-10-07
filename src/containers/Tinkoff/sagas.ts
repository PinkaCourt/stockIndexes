import { call, fork, put, select, takeEvery } from "redux-saga/effects";

import { getBrokerAccountId, getPortfolio } from "api/tinkoff";
import { ReturnTypePromise } from "api/types";
import * as A from "./actions";
//import * as S from "./selectors";
import * as T from "./types";

function* getTFAccountId() {
  /* const accounts: ReturnTypePromise<typeof getBrokerAccountId> = yield call(
    getBrokerAccountId
  );*/
  const { accounts } = yield call(getBrokerAccountId);
  //: ReturnTypePromise<typeof getBrokerAccountId>

  console.log("accounts", accounts);

  if (accounts) {
    yield put(A.setTFAccountId(accounts[0].brokerAccountId));
    yield put(A.getTFPortfolio(accounts[0].brokerAccountId));
  }
}

function* getTFPortfolio({ payload }: ReturnType<typeof A.getTFPortfolio>) {
  const { positions } = yield call(getPortfolio, payload);
  //const resp: T.Payload = yield call(getPortfolio, payload);

  if (positions) {
    yield put(A.setTFPortfolio(positions));
  }
}

export default function* tinkoffSaga() {
  yield fork(getTFAccountId);
  yield takeEvery(A.getTFPortfolio, getTFPortfolio);
}
