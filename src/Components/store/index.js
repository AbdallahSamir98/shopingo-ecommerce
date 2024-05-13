import { configureStore } from "@reduxjs/toolkit"
import category from "./allCategories"
import products from "./allProducts"
import cart from "./cart"
import wishlist from "./wishlist"
import brands from "./allBrands"
const store =configureStore({
reducer:{
    category,
    products,
    cart,
    wishlist,
    brands


}
}) 


export default store