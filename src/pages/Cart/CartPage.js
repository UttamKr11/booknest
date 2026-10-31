import { UseCart } from "../../context/CartContext"
import { CartEmpty } from "./components/CartEmpty"
import { CartList } from "./components/CartList"

export const CartPage = () => {
  const { cartList } = UseCart()
  return (
    <main>
      {
        cartList.length > 0 ? (<CartList />) : (<CartEmpty />)
      }

    </main>
  )
}
