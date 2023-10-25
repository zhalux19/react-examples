import axios from "axios"
import { useEffect, useState } from "react"
import { Product } from "./productsApi"

const ProductsPlain = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/products", {
          cancelToken: source.token,
        })
        setProducts(data)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message)
        } else {
          console.log(error)
        }
      }
    }

    fetchData()

    return () => {
      source.cancel("Request canceled by cleanup")
    }
  }, [])
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.description}</li>
      ))}
    </ul>
  )
}

export default ProductsPlain
