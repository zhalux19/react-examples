import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchProducts } from "./productsSlice"
import { addToCart } from "../cart/cartSlice"
import ApiStatus from "../../types/ApiStatus"
import styles from "./Products.module.css"
const Products = () => {
  const inputRefs: Record<string, HTMLInputElement | null> = {}
  const dispatch = useAppDispatch()
  const [productQuantity, setProductQuantity] = useState<
    Record<string, number>
  >({})

  const handleChangeQuantity = (
    e: React.FocusEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const quantity = Number(e.target.value) || 0
    setProductQuantity((prev) => ({
      ...prev,
      [productId]: quantity,
    }))
  }

  const addItemsToCart = (productId: string) => {
    dispatch(
      addToCart({
        productId,
        quantity: productQuantity[productId] ? productQuantity[productId] : 1,
      }),
    )
    if (inputRefs[productId]) {
      inputRefs[productId]!.value = "1"
    }
    setProductQuantity((prev) => ({ ...prev, [productId]: 1 }))
  }

  const products = useAppSelector((state) => state.products.products)
  const fetchProductsApiStatus = useAppSelector(
    (state) => state.products.fetchProductsApiStatus,
  )
  const fetchProductsErrorMessage = useAppSelector(
    (state) => state.products.fetchProductsErrorMessage,
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (fetchProductsApiStatus === ApiStatus.Rejected) {
    return (
      <p>
        {fetchProductsErrorMessage
          ? fetchProductsErrorMessage
          : "Sorry something went wrong when fetching products"}
      </p>
    )
  }

  if (fetchProductsApiStatus === ApiStatus.Fulfilled) {
    return (
      <ul className={styles.container}>
        {Object.values(products).map((product) => (
          <li className={styles.item} key={product.id}>
            <figure>
              <img src={product.imageURL} alt={product.imageAlt} />
              <caption>{product.name}</caption>
            </figure>
            <input
              type="number"
              defaultValue={1}
              ref={(input) => (inputRefs[product.id] = input)}
              onBlur={(e) => {
                handleChangeQuantity(e, product.id)
              }}
            />
            <button
              onClick={() => {
                addItemsToCart(product.id)
              }}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default Products
