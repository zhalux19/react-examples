import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { checkout, updateQuantity } from "./cartSlice"
import styles from "./Cart.module.css"
import { cartTotal } from "./cartSelector"
const Cart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const products = useAppSelector((state) => state.products.products)
  const grandTotal = useAppSelector(cartTotal)

  const handleChangeQuantity = (
    e: React.FocusEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const quantity = Number(e.target.value) || 0
    dispatch(updateQuantity({ quantity, productId }))
  }

  const handleCheckout = () => {
    dispatch(checkout())
  }

  return (
    <div className={styles.container}>
      Cart
      <table>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        {Object.entries(items).map(([productId, quantity]) => {
          return (
            <tr key={productId}>
              <td>{products[productId].name}</td>
              <th>{products[productId].price.toFixed(2)}</th>
              <td>
                <input
                  type="number"
                  defaultValue={quantity}
                  onBlur={(e) => {
                    handleChangeQuantity(e, productId)
                  }}
                />
              </td>
              <td>{(quantity * products[productId].price).toFixed(2)}</td>
            </tr>
          )
        })}
      </table>
      <p>Grand total: {grandTotal}</p>
      <button
        onClick={() => {
          handleCheckout()
        }}
      >
        Checkout
      </button>
    </div>
  )
}

export default Cart
