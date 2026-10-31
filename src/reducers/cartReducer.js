export const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_TO_CART":
            return { ...state, cartList: payload.books, total: payload.total }
        case "REMOVE_FROM_CART":
            return { ...state, cartList: payload.books, total: payload.total }

        default:
            return state;
    }
}