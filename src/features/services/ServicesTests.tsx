import { rest } from "msw"
import { server } from "../../mocks/server"
import { renderWithContext } from "../../test-util"
import Services from "./Services"
import { screen, waitFor } from "@testing-library/react"

describe("Test api call for get services", () => {
  it("Should show loading and then services", async () => {
    renderWithContext(<Services />)
    screen.getByText("Loading")
    await waitFor(() => {
      screen.getByTestId("services-container")
    })
  })
  it("Should show error if api call fails", async () => {
    server.use(
      rest.get("api/services", (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "internal server error" }),
        )
      }),
    )
    renderWithContext(<Services />)
    screen.getByText("Loading")
    await waitFor(() => {
      screen.getByTestId("error-message-container")
    })
  })
})
