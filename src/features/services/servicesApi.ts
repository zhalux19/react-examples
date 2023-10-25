import { apiSlice } from "../../app/apiSlice"

type Service = {
  id: string
  title: string
  description: string
  price: string
  imageSrc: string
  imageAlt: string
  restriction: {
    minAge: number
    size: string[]
    breed: string[]
  }
}

const servicesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Record<string, Service>, void>({
      query: () => "/services",
    }),
  }),
})

export const { useGetServicesQuery } = servicesApi
