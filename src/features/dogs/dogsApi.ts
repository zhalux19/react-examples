import { apiSlice } from "../../app/apiSlice"

export type Dog = {
  id: string
  name: string
  size: string
  age: number
  breed: string
}

export type NewDog = {
  dateOfBirth: Date
  name: string
  weight: number
  breed: string
}
export type DogData = Omit<NewDog, "dateOfBirth"> & {
  id: string
  dateOfBirth: string
}

const dogsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Dogs"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getDogs: build.query<Record<string, Dog>, void>({
        query: () => "/dogs",
        providesTags: ["Dogs"],
        transformResponse: (dogs: Record<string, DogData>) => {
          return Object.values(dogs).reduce(
            (acc: Record<string, Dog>, curr) => {
              const { id, name, breed, weight, dateOfBirth } = curr
              return {
                ...acc,
                [curr.id]: {
                  id,
                  name,
                  breed,
                  size: getSize(weight),
                  age: getAge(dateOfBirth),
                },
              }
            },
            {},
          )
        },
      }),
      addDog: build.mutation<void, NewDog>({
        query: (body) => ({
          url: "/dogs",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Dogs"],
      }),
      removeDog: build.mutation<void, string>({
        query: (id) => ({
          url: "/dogs/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["Dogs"],
      }),
    }),
  })

const getSize = (weight: number) => {
  if (weight <= 10) return "teacup"
  if (weight <= 25) return "small"
  if (weight <= 50) return "medium"
  if (weight <= 80) return "large"
  if (weight <= 125) return "x-large"
  return "jumbo"
}

const getAge = (dob: string) => {
  const today = new Date()
  const dateOfBirth = new Date(dob)
  const yearDifference = today.getFullYear() - dateOfBirth.getFullYear()
  const monthsDifference = today.getMonth() - dateOfBirth.getMonth()
  const daysDifference = today.getDate() - dateOfBirth.getDate()
  if (monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)) {
    return yearDifference - 1
  }
  return yearDifference
}

export const { useGetDogsQuery, useAddDogMutation, useRemoveDogMutation } =
  dogsApi
