import { all, call, spawn } from "redux-saga/effects"

import { getBooksWatchSage } from "../features/books/booksSaga"
import { fetchProductsWatchSaga } from "../features/products/productsSaga"
import { checkoutWatchSaga } from "../features/cart/cartSaga"
import { getPostsWatchSaga } from "../features/posts/postsSaga"

export default function* rootSaga() {
  const sagas = [
    getBooksWatchSage,
    fetchProductsWatchSaga,
    checkoutWatchSaga,
    getPostsWatchSaga,
  ]

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          yield call(saga)
          break
        }
      }),
    ),
  )
}
