import { useParams, useSearchParams } from "react-router-dom"

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentParams = Object.fromEntries([...searchParams])
  console.log(currentParams["colour"])
  console.log(currentParams["age"])
  return (
    <div>
      <p>ProductsPage {id}</p>
      <button
        onClick={() => {
          searchParams.set("age", "20")
          setSearchParams(searchParams)
        }}
      >
        Do something
      </button>
    </div>
  )
}

export default Product
