import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import { addAuthorValidationSchema } from "./validationSchemas"

type FormData = {
  name: string
}
const AddAuthor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(addAuthorValidationSchema),
  })
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <div>
      <p>Add Author</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="enter name" {...register("name")} />
        {errors?.name && <p>{errors.name.message}</p>}
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddAuthor
