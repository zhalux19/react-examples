import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import ApiStatus from "../../types/ApiStatus"

type CartState = {
  items: Record<string, number>
  checkoutApiStatus: ApiStatus
  checkoutErrorMessage: string
}

const initialState: CartState = {
  items: {},
  checkoutApiStatus: ApiStatus.Idle,
  checkoutErrorMessage: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload
      if (state.items[productId]) {
        state.items[productId] = state.items[productId] + quantity
      } else {
        state.items[productId] = quantity
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload
      state.items[productId] = quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload]
    },
    checkout: (state) => {
      state.checkoutApiStatus = ApiStatus.Pending
    },
    checkoutFulfilled: (state) => {
      state.checkoutApiStatus = ApiStatus.Fulfilled
      state.items = {}
    },
    checkoutRejected: (state, action: PayloadAction<string>) => {
      state.checkoutApiStatus = ApiStatus.Rejected
      state.checkoutErrorMessage = action.payload
    },
  },
})

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  checkout,
  checkoutFulfilled,
  checkoutRejected,
} = cartSlice.actions
export default cartSlice.reducer
