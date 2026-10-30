
export const FilterReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "PRODUCT_LIST":
            return { booksList: payload.books }
        case "SORT_BY":
            return { ...state, sortBy: payload.sortBy }
        case "RATINGS":
            return { ...state, rating: payload.rating }
        case "BEST_SELLER_ONLY":
            return { ...state, bestSellerOnly: payload.bestSellerOnly }
        case "IN_STOCK_ONLY":
            return { ...state, onlyStock: payload.onlyStock }
        case "CLEAR_FLTER":
            return {
                ...state,
                onlyStock: false,
                bestSellerOnly: false,
                sortBy: null,
                rating: null
            }


        default:
            break;
    }
}
