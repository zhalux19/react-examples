import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import ApiStatus from "../../types/ApiStatus"
import { Product } from "./productsApi"

type ProductState = {
  products: Record<string, Product>
  fetchProductsApiStatus: ApiStatus
  fetchProductsErrorMessage: string
}

const initialState: ProductState = {
  products: {},
  fetchProductsApiStatus: ApiStatus.Idle,
  fetchProductsErrorMessage: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.fetchProductsApiStatus = ApiStatus.Pending
    },
    fetchProductsFulfilled: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr }
      }, {})
      state.fetchProductsApiStatus = ApiStatus.Fulfilled
    },
    fetchProductsRejected: (state) => {
      state.fetchProductsApiStatus = ApiStatus.Rejected
    },
  },
})

export const { fetchProducts, fetchProductsFulfilled, fetchProductsRejected } =
  productsSlice.actions

export default productsSlice.reducer
