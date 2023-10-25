import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetDogsQuery } from "./dogsApi"
import { setLuckyDog } from "./dogsSlice"
import { yupResolver } from "@hookform/resolvers/yup"
import { setLuckyDogSchema } from "./validationSchema"

type FormData = {
  luckyDogId: string
}

const SelectLuckyDog = () => {
  const { data: myDogs, isSuccess } = useGetDogsQuery()
  const luckyDogId = useAppSelector((state) => state.dogs.luckyDog)
  const dispatch = useAppDispatch()
  const handleSetLuckyDog = (formData: FormData) => {
    dispatch(setLuckyDog(formData.luckyDogId))
  }
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { luckyDogId },
    resolver: yupResolver(setLuckyDogSchema),
  })
  if (isSuccess && myDogs) {
    return (
      <form onSubmit={handleSubmit(handleSetLuckyDog)}>
        <label htmlFor="luckyDogId">Lucky dog:</label>
        <select {...register("luckyDogId")}>
          <option value="">Please select a dog</option>
          {Object.values(myDogs).map((dog) => (
            <option value={dog.id} key={dog.id}>
              {dog.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    )
  }
  return null
}

export default SelectLuckyDog
