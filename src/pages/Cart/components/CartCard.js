import { Link } from "react-router-dom"
import { UseCart } from "../../../context/CartContext"

export const CartCard = ({ cartItem }) => {
  const { removeFromCart } = UseCart()

  return (
    <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => removeFromCart(cartItem)}
          aria-label={`Remove ${cartItem.name} from cart`}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          <i className="bi bi-trash3" aria-hidden="true"></i>
        </button>
        <Link to={`/product/${cartItem.id}`}>
          <img className="w-32 rounded" src={cartItem.imageLocal} alt="" />
        </Link>
        <div className="">
          <Link to={`/product/${cartItem.id}`}>
            <p className="text-lg ml-2 dark:text-slate-200">{cartItem.name}</p>
          </Link>
        </div>
      </div>
      <div className="text-lg m-2 dark:text-slate-200">
        <span>${cartItem.price}</span>
      </div>
    </div>
  )
}
