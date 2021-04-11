

import { fork, spawn, all } from "redux-saga/effects";
import search from "./search/search";

export default function* rootSaga() {
  yield fork(search)
}