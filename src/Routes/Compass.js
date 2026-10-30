import { Routes, Route } from "react-router-dom"
import { HomePage, ProductsList, ProductDetail, Login, PageNotFound, Register } from "../pages"
export const Compass = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products" element={<ProductsList />}></Route>
            <Route path="/product/:id" element={<ProductDetail />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    )
}
