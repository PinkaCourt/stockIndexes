import { call, fork, put, select, takeEvery } from "redux-saga/effects";

//import { getBrokerAccountId } from "api";
//import * as A from "store/actions";
//import * as S from "store/selectors";
//import * as T from "store/types";
/*
function* getTFAccountId() {
  const { payload } = yield call(getBrokerAccountId);

  console.log(payload);

  if (payload) {
    console.log(payload.accounts[0].brokerAccountId);
    yield put(A.setTFAccountId(payload.accounts[0].brokerAccountId));
  }
}*/

export default function* moexSaga() {
  //moexWatcher
  //yield fork(getTFAccountId);
  // yield takeEvery(A.authorizationUser, authorizationUser);
  // yield takeEvery(A.registerUser, registerUser);
  // yield takeEvery(A.updateUserAvatar, updateUserAvatar);
  // yield takeEvery(A.updateUserName, updateUserName);
  // yield takeEvery(A.getUserProfile, getUserProfile);
  // yield takeEvery(A.getUserData, getUserData);
}
