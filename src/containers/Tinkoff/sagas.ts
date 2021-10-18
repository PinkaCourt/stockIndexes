import { call, fork, put, takeEvery } from "redux-saga/effects";

import { getBrokerAccountId, getPortfolio, getAllStocks } from "api/tinkoff";
import * as A from "./actions";
import * as T from "./types";

function* getTFAccountId() {
  const { accounts } = yield call(getBrokerAccountId);

  if (accounts) {
    yield put(A.setTFAccountId(accounts[0].brokerAccountId));
    yield put(A.getTFPortfolio(accounts[0].brokerAccountId));
    yield put(A.getAllStocks());
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
    yield put(A.tinkoffIsDone());
  }
}

function* getAllStocksServer() {
  const { instruments } = yield call(getAllStocks);

  if (instruments) {
    const instrumentMap: T.InstrumentMap = instruments.reduce(
      (accum: any, current: T.Instrument) => {
        accum[current.ticker] = current;
        return accum;
      },
      {} as T.InstrumentMap
    );
    yield put(A.setAllStocks(instrumentMap));
  }
}

export default function* tinkoffSaga() {
  yield fork(getTFAccountId);
  yield takeEvery(A.getTFPortfolio, getTFPortfolio);
  yield takeEvery(A.getAllStocks, getAllStocksServer);
}
