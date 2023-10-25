import { call, put, select, takeLeading } from "redux-saga/effects"
import { checkout, checkoutFulfilled, checkoutRejected } from "./cartSlice"
import { RootState } from "../../app/store"
import { checkoutCart } from "./cartApi"

function* checkoutWorkSaga() {
  try {
    const data: Record<string, number> = yield select(
      (state: RootState) => state.cart.items,
    )
    yield call(checkoutCart, data)
    yield put(checkoutFulfilled())
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout API call failed"
    yield put(checkoutRejected(message))
  }
}

export function* checkoutWatchSaga() {
  yield takeLeading(checkout.type, checkoutWorkSaga)
}
