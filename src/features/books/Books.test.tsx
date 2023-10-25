import { renderWithContext } from "../../test-util"
import { screen, waitFor } from "@testing-library/react"
import Books from "./Books"
import ApiStatus from "../../types/ApiStatus"
import { server } from "../../mocks/server"
import { rest } from "msw"

describe("test api lifecycle for fetching books", () => {
  it("Should make get call for books", async () => {
    const { store } = renderWithContext(<Books />)
    screen.getByText("Loading")

    expect(store.getState().books.getBooksApiStatus).toEqual(ApiStatus.Pending)
    await waitFor(() => {
      screen.getAllByText("book 1")
      expect(store.getState().books.getBooksApiStatus).toEqual(
        ApiStatus.Fulfilled,
      )
    })
  })

  it("Should show error when api call fails", async () => {
    server.use(
      rest.get("/books", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "internal server error" }),
        )
      }),
    )
    const { store } = renderWithContext(<Books />)
    screen.getByText("Loading")
    expect(store.getState().books.getBooksApiStatus).toEqual(ApiStatus.Pending)
    await waitFor(() => {
      screen.getAllByText("Something went wrong")
      expect(store.getState().books.getBooksApiStatus).toEqual(
        ApiStatus.Rejected,
      )
    })
  })

  it("Should make get call for books2", async () => {
    const { store } = renderWithContext(<Books />)
    screen.getByText("Loading")

    expect(store.getState().books.getBooksApiStatus).toEqual(ApiStatus.Pending)
    await waitFor(() => {
      screen.getAllByText("book 1")
      expect(store.getState().books.getBooksApiStatus).toEqual(
        ApiStatus.Fulfilled,
      )
    })
  })
})
