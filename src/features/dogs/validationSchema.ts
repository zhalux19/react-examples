import * as yup from "yup"
export const addDogSchema = yup.object({
  name: yup.string().required("Please enter dog name"),
  dateOfBirth: yup.date().required("Please select date"),
  weight: yup.number().required("Please enter weight"),
  breed: yup.string().required("Please select breed"),
})

export const setLuckyDogSchema = yup.object({
  luckyDogId: yup.string().required("Please select a dog"),
})
