import { call, put, takeLeading } from "redux-saga/effects"
import { Product, getProducts } from "./productsApi"
import {
  fetchProducts,
  fetchProductsFulfilled,
  fetchProductsRejected,
} from "./productsSlice"

function* fetchProductsWorkSaga() {
  try {
    const products: Product[] = yield call(getProducts)
    yield put(fetchProductsFulfilled(products))
  } catch (e) {
    yield put(fetchProductsRejected())
  }
}

export function* fetchProductsWatchSaga() {
  yield takeLeading(fetchProducts.type, fetchProductsWorkSaga)
}
