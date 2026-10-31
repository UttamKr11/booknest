import { createContext, useContext, useReducer } from "react";
import { cartReducer } from '../reducers/cartReducer'

const cartInitialState =
{
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addBook = (book) => {
        const updatedCartList = state.cartList.concat(book)
        const updatedTotal = state.total + book.price

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                books: updatedCartList,
                total: updatedTotal
            }
        })
    }
    const removeFromCart = (book) => {
        const updatedCart = state.cartList.filter(x => x.id !== book.id)
        const updatedTotal = state.total - book.price
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                books: updatedCart,
                total: updatedTotal
            }
        })
    }

    const value = {
        total: state.total,
        cartList: state.cartList,
        addBook,
        removeFromCart
    };



    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>

}

export const UseCart = () => {
    return useContext(CartContext);
}