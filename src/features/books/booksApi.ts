import axios from "axios"

export type Book = {
  id: string
  name: string
}

export type Author = {
  id: string
  name: string
}

export type BookAuthorMapping = {
  id: string
  book: string
  author: string
}

export type BookAuthor = {
  books: Book[]
  authors: Author[]
  bookAuthorMappings: BookAuthorMapping[]
}

export const fetchBooks = async (): Promise<BookAuthor> => {
  try {
    const { data } = await axios.get("./books")
    return data
  } catch (e) {
    throw e
  }
}
