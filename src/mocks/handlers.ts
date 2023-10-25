import { rest } from "msw"
import bookAuthor from "./bookAuhtor.json"
import products from "./products.json"
import services from "./services.json"
import posts1 from "./posts1.json"
import posts2 from "./posts2.json"

const DOG_KEY = "dogs"

const lightlyPersist = (key: string, payload: any) => {
  sessionStorage.setItem(key, JSON.stringify(payload))
}

const readFromStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "{}")
}

export const handlers = [
  rest.post("/checkout", (req, res, ctx) => {
    // return res(ctx.status(500), ctx.json({ message: "internal server error" }))
    return res(ctx.status(200))
  }),
  rest.get("/books", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bookAuthor))
  }),
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products))
  }),
  rest.get("/api/services", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(services)))
  }),
  rest.post("/api/dogs", async (req, res, ctx) => {
    const request = await req.json()
    const id = crypto.randomUUID()
    const dog = { ...request, id }
    const existingDogs = readFromStorage(DOG_KEY)
    const dogs = { ...existingDogs, [id]: dog }
    lightlyPersist(DOG_KEY, dogs)
    return res(ctx.status(200))
  }),
  rest.get("/api/dogs", async (req, res, ctx) => {
    const existingDogs = readFromStorage(DOG_KEY)
    return res(ctx.status(200), ctx.json(existingDogs))
  }),
  rest.delete("/api/dogs/:id", async (req, res, ctx) => {
    const id = req.params.id as string
    const dogs = readFromStorage(DOG_KEY)
    if (dogs[id]) {
      delete dogs[id]
      lightlyPersist(DOG_KEY, dogs)
      return res(ctx.status(200))
    } else {
      return res(
        ctx.delay(),
        ctx.status(404),
        ctx.json({ message: "what dog?" }),
      )
    }
  }),
  rest.get("/api/posts", async (req, res, ctx) => {
    const urlParams = new URL(req.url).searchParams
    const pageNumber = urlParams.get("pageNumber")
    if (pageNumber === "1") {
      return res(ctx.status(200), ctx.json(posts1))
    }
    if (pageNumber === "2") {
      return res(ctx.status(200), ctx.json(posts2))
    }
    return res(ctx.status(200), ctx.json({}))
  }),
]
