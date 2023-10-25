import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export const cartTotal = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    return Object.entries(items)
      .reduce((acc, curr) => {
        const [productid, quantity] = curr
        return acc + quantity * products[productid].price
      }, 0)
      .toFixed(2)
  },
)
