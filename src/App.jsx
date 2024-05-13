import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Components/Main/Main'
import Home from './Components/Home/HomeCategory'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import { Provider } from 'react-redux'
import store from './Components/store'
import HomeDisplay from './Components/Home/HomeDisplay'
import Cart from './Components/Cart/Cart'
import ViewProduct from './Components/ViewProduct/ViewProduct'
import Wishlist from './Components/Wishlist/Wishlist'
import DisplayAllProducts from './Components/AllProducts/DisplayAllProducts'
import Checkout from './Components/Checkout/Checkout'
import Orders from './Components/Orders/Orders'
import AllBrands from './Components/store/allBrands'
import Brands from './Components/Brands/Brands'
import Error from './Components/Error/Error'

const App = () => {

  const routers =createBrowserRouter([{
    path:'',
    element:<Main/>,
    children: [
      {path:'', element:<HomeDisplay/>},
      {path:'/home', element:<HomeDisplay/>},
      {path:'/register', element:<Register/>},
      {path:'/login', element:<Login/>},
      {path:'/forgetPassword', element:<ForgetPassword/>},
      {path:'/cart', element:<Cart/>},
      {path:'/viewproduct', element:<ViewProduct/>},
      {path:'/allproducts', element:<DisplayAllProducts/>},
      {
        path: "viewproduct",
        element:  <ViewProduct />,
        children: [
          {  children: [{ path: ":id" }] }, // 3lshan ab3t parameter fe l url
        ],
      },
      {path:'/wishlist', element:<Wishlist/>},
      {path:'/checkout', element:<Checkout/>},
      {path:'/orders', element:<Orders/>},
      {path:'/brands', element:<Brands/>},
      {path:'*', element:<Error/>},


    ]


  }])



  return (
    <Provider store={store}>

      <RouterProvider router={routers} />
    </Provider>

  )
}

export default App