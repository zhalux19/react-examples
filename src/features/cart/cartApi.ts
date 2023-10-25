import axios from "axios"

export const checkoutCart = async (cart: Record<string, number>) => {
  try {
    await axios.post("/checkout", cart)
  } catch (e) {
    throw e
  }
}
