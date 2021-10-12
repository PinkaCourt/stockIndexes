import { call, fork, put, takeEvery } from "redux-saga/effects";

import { getBrokerAccountId, getPortfolio } from "api/tinkoff";
import * as A from "./actions";
import * as T from "./types";

function* getTFAccountId() {
  const { accounts } = yield call(getBrokerAccountId);

  if (accounts) {
    yield put(A.setTFAccountId(accounts[0].brokerAccountId));
    yield put(A.getTFPortfolio(accounts[0].brokerAccountId));
  }
}

function* getTFPortfolio({ payload }: ReturnType<typeof A.getTFPortfolio>) {
  const { positions } = yield call(getPortfolio, payload);

  if (positions) {
    const positionMap: T.PositionMap = positions.reduce(
      (accum: any, current: T.Position) => {
        accum[current.ticker] = current;
        return accum;
      },
      {} as T.PositionMap
    );
    yield put(A.setTFPortfolio(positionMap));
  }
}

export default function* tinkoffSaga() {
  yield fork(getTFAccountId);
  yield takeEvery(A.getTFPortfolio, getTFPortfolio);
}
