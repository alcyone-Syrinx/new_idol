

import { fork, spawn, all } from "redux-saga/effects";
import search from "./search/search";
import trade from "./search/trade";


export default function* rootSaga() {
  yield fork(search)
  yield fork(trade)
}