import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetDogsQuery, useRemoveDogMutation } from "./dogsApi"
import { setLuckyDog } from "./dogsSlice"

const DisplayDogs = () => {
  const {
    data: myDogs,
    isLoading: isLoadingDogs,
    isSuccess: isLoadingDogsSuccess,
  } = useGetDogsQuery()

  const [removeDog] = useRemoveDogMutation()

  const luckyDogId = useAppSelector((state) => state.dogs.luckyDog)
  const handleDeletDog = (dogId: string) => {
    removeDog(dogId)
  }

  if (isLoadingDogs) {
    return <p>Loading</p>
  }
  if (isLoadingDogsSuccess) {
    return (
      <div>
        <ul>
          {myDogs &&
            Object.values(myDogs).map((dog) => (
              <li key={dog.id}>
                {dog.name} {dog.size}
                {dog.age}
                {dog.id === luckyDogId && <p>This our lucky dog</p>}
                <button
                  onClick={() => {
                    handleDeletDog(dog.id)
                  }}
                >
                  Delete dog
                </button>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  return null
}

export default DisplayDogs
