import { useForm } from "react-hook-form"
import { NewDog, useAddDogMutation } from "./dogsApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDogSchema } from "./validationSchema"

const AddDogForm = () => {
  const [addDog] = useAddDogMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewDog>({ resolver: yupResolver(addDogSchema) })
  const onSubmit = (data: NewDog) => {
    addDog(data)
    reset()
  }
  return (
    <div>
      AddDogForm
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="name">Dog name:</label>
          <input placeholder="enter dog name" {...register("name")} />
        </fieldset>
        <fieldset>
          <label htmlFor="dateOfBirth">Date of birth:</label>
          <input type="date" {...register("dateOfBirth")} />
        </fieldset>
        <fieldset>
          <label htmlFor="Weight">Weight:</label>
          <input type="number" max="200" min="0" {...register("weight")} />
        </fieldset>
        <fieldset>
          <label htmlFor="breed">Breed:</label>
          <select id="breed" {...register("breed")}>
            <option value="">(Select)</option>
            <option value="golden-retriever">Golden Retriever</option>
            <option value="pug">Pug</option>
            <option value="dalmation">Dalmation</option>
            <option value="german-shepherd">German Shepherd</option>
            <option value="lab">Lab</option>
            <option value="poodle">Poodle</option>
            <option value="french-bulldog">French Bulldog</option>
            <option value="cockerspaniel">Cockerspaniel</option>
            <option value="husky">Husky</option>
            <option value="hound">Hound</option>
            <option value="great-dane">Great Dane</option>
            <option value="scottish-terrir">Scottish Terrier</option>
            <option value="mixed">Mixed</option>
            <option value="other">Other</option>
          </select>
        </fieldset>
        <button type="submit">Add dog</button>
      </form>
    </div>
  )
}

export default AddDogForm
