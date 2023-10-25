import * as yup from "yup"
export const addAuthorValidationSchema = yup.object({
  name: yup.string().required("Please enter author name"),
})
