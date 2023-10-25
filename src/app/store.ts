import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import booksReduder from "../features/books/booksSlice"
import productsReducer from "../features/products/productsSlice"
import cartReducer from "../features/cart/cartSlice"
import dogsReducer from "../features/dogs/dogsSlice"
import postsReducer from "../features/posts/postsSlice"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"

import { apiSlice } from "./apiSlice"

const sagaMiddleware = createSagaMiddleware()
const reducer = {
  counter: counterReducer,
  books: booksReduder,
  products: productsReducer,
  cart: cartReducer,
  dogs: dogsReducer,
  posts: postsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
}
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(apiSlice.middleware),
})

export const getTestStore = (preloadedState?: RootState) => {
  const testSagaMiddleware = createSagaMiddleware()
  const testStore = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(testSagaMiddleware)
        .concat(apiSlice.middleware),
  })
  testSagaMiddleware.run(rootSaga)
  return testStore
}

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
