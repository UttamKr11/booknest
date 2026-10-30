import { createContext, useContext, useReducer } from "react";
import { FilterReducer } from "../reducers/FilterReducer";
const filterInitialState =
{
    booksList: [],
    onlyStock: false,
    bestSellerOnly: false,
    sortBy: null,
    rating: null
}

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FilterReducer, filterInitialState);

    function initBooks(books) {
        dispatch({
            type: "PRODUCT_LIST",
            payload:
            {
                books: books
            }

        })
    }

    function bestSeller(books) {
        return state.bestSellerOnly ? books.filter(book => book.bestSeller === true) : books;
    }

    function availableInStock(books) {
        return state.onlyStock ? books.filter(book => book.inStock === true) : books;
    }

    function filterRating(books) {
        if (state.rating === "4StarAndAbove") {
            return books.filter(book => book.rating > 4);
        }
        if (state.rating === "3StarAndAbove") {
            return books.filter(book => book.rating > 3);
        }
        if (state.rating === "2StarAndAbove") {
            return books.filter(book => book.rating > 2);
        }
        if (state.rating === "1StarAndAbove") {
            return books.filter(book => book.rating > 1);
        }
        return books;
    }

    function sortByPrice(books) {
        if (state.sortBy === "highToLow") {
            return books.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (state.sortBy === "lowToHigh") {
            return books.sort((a, b) => Number(b.price) - Number(a.price));
        }
        return books;
    }
    const filterBookList = sortByPrice(filterRating(availableInStock(bestSeller(state.booksList))));
    const value = {
        state,
        dispatch,
        booksList: filterBookList,
        initBooks
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext);