import axios from "axios"

export type Product = {
  id: string
  name: string
  price: number
  description: string
  imageURL: string
  imageAlt: string
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get("./products")
    return data
  } catch (e) {
    throw e
  }
}
