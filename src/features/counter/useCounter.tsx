import { useState } from "react"

const useCounter = () => {
  const [counter, setCounter] = useState(0)
  const increament = () => {
    setCounter((prev) => prev + 1)
  }
  const decreament = () => {
    setCounter((prev) => prev - 1)
  }
  return { counter, increament, decreament }
}

export const CounterHookConsumer = () => {
  const { counter, increament, decreament } = useCounter()
  const [message, setMessage] = useState("")
  const someValue = "abc"

  return (
    <>
      <p>{counter}</p>
      <div>
        <button
          onClick={() => {
            increament()
          }}
        >
          Increament
        </button>
        <button
          onClick={() => {
            decreament()
          }}
        >
          decreament
        </button>
      </div>
    </>
  )
}
