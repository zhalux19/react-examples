import { call, put, takeLeading } from "redux-saga/effects"
import { BookAuthor, fetchBooks } from "./booksApi"
import { getBooks, getBooksFulfilled, getBooksRejected } from "./booksSlice"

function* getBooksWorkSage() {
  try {
    const books: BookAuthor = yield call(fetchBooks)
    yield put(getBooksFulfilled(books))
  } catch (e) {
    console.log(e)
    yield put(getBooksRejected())
  }
}

export function* getBooksWatchSage() {
  yield takeLeading(getBooks.type, getBooksWorkSage)
}
