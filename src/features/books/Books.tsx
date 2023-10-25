import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ApiStatus from "../../types/ApiStatus"
import { getBooks } from "./booksSlice"

const Books = () => {
  const dispatch = useAppDispatch()
  const getBooksApiStatus = useAppSelector(
    (state) => state.books.getBooksApiStatus,
  )
  const books = useAppSelector((state) => state.books.books)
  const authors = useAppSelector((state) => state.books.authors)
  const mappings = useAppSelector((state) => state.books.bookAuthorMappings)
  useEffect(() => {
    dispatch(getBooks())
  }, [])

  if (getBooksApiStatus === ApiStatus.Pending) {
    return <p>Loading</p>
  }
  if (getBooksApiStatus === ApiStatus.Rejected) {
    return <p>Something went wrong</p>
  }
  if (getBooksApiStatus === ApiStatus.Fulfilled) {
    return (
      <ul>
        {Object.entries(books).map(([bookId, book]) => (
          <li key={bookId}>
            {book.name}
            <ul>
              {Object.values(mappings)
                .filter((x) => x.book === book.id)
                .map((mapping) => (
                  <li key={mapping.id}>{authors[mapping.author].name}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export default Books
