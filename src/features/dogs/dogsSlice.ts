import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type DogState = {
  luckyDog: string
}

const initialState: DogState = {
  luckyDog: "",
}

const dogsSlice = createSlice({
  name: "Dogs",
  initialState,
  reducers: {
    setLuckyDog: (state, action: PayloadAction<string>) => {
      state.luckyDog = action.payload
    },
  },
})

export const { setLuckyDog } = dogsSlice.actions
export default dogsSlice.reducer
