import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Author, Book, BookAuthorMapping, BookAuthor } from "./booksApi"
import ApiStatus from "../../types/ApiStatus"

export type BooksState = {
  books: Record<string, Book>
  authors: Record<string, Author>
  bookAuthorMappings: Record<string, BookAuthorMapping>
  getBooksApiStatus: ApiStatus
}

const initialState: BooksState = {
  books: {},
  authors: {},
  bookAuthorMappings: {},
  getBooksApiStatus: ApiStatus.Idle,
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction<number>) => {
      state.getBooksApiStatus = ApiStatus.Pending
    },
    getBooksFulfilled: (state, action: PayloadAction<BookAuthor>) => {
      const { books, authors, bookAuthorMappings } = action.payload
      books.forEach((book) => {
        state.books[book.id] = book
      })
      authors.forEach((author) => {
        state.authors[author.id] = author
      })
      bookAuthorMappings.forEach((mapping) => {
        state.bookAuthorMappings[mapping.id] = mapping
      })
      state.getBooksApiStatus = ApiStatus.Fulfilled
    },
    getBooksRejected: (state) => {
      state.getBooksApiStatus = ApiStatus.Rejected
    },
  },
})
export const { getBooks, getBooksFulfilled, getBooksRejected } =
  booksSlice.actions
export default booksSlice.reducer
