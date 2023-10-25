import AddAuthor from "../../features/books/AddAuthor"
import Books from "../../features/books/Books"
import Products from "../../features/products/Products"
import Cart from "../../features/cart/Cart"
import ProductsPlain from "../../features/products/ProductsPlain"
import { CounterHookConsumer } from "../../features/counter/useCounter"
import Services from "../../features/services/Services"
import AddDogForm from "../../features/dogs/AddDogForm"
import DisplayDogs from "../../features/dogs/DisplayDogs"
import SelectLuckyDog from "../../features/dogs/SelectLuckyDog"

const index = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <Books />
      <AddAuthor />
      <Products />
      <Cart />
      <ProductsPlain />
      <CounterHookConsumer /> */}
      {/* <Services /> */}
      <DisplayDogs />
      <SelectLuckyDog />
      <AddDogForm />
    </div>
  )
}

export default index
