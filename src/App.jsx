import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Link,
}from "react-router-dom";


import PrivateRoutes from "./utils/PrivateRoutes";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Products from "./pages/products/Products";
import EditProducts from "./pages/products/EditProducts";
import AddProducts from "./pages/products/AddProducts";


import Customers from "./pages/customers/Customers";
import AddCustomers from "./pages/customers/AddCustomers";
import EditCustomers from "./pages/customers/EditCustomers";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import Categories from './pages/categories/Categories'
import EditCategory from './pages/categories/EditCategory'
import AddCategory from './pages/categories/AddCategory'
import Login from './pages/login/Login';
import Message from "./pages/Message";
import { useContext } from "react";

import {AuthContext} from './contexts/AuthContext';
function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>

        <Route index element={<Login logged={isAuthenticated}/>}/>
        <Route element={<PrivateRoutes logged={isAuthenticated}/>}>

        <Route path="home" element={<Home/>}/>

        <Route path="/products">
          <Route index element={<Products/>}/>
          <Route path="edit-product/:id" element={<EditProducts/>}/>
          <Route path="add-product" element={<AddProducts/>}/>

        </Route>

        <Route path="/customers">
          <Route index element={<Customers/>}/>
          <Route path="edit-customer/:id" element={<EditCustomers/>}/>
          <Route path="add-customer" element={<AddCustomers/>}/>
        </Route>
        <Route path="/category">
          <Route index element={<Categories/>}/>
          <Route path="edit-category/:id" element={<EditCategory/>}/>
          <Route path="add-category" element={<AddCategory/>}/>
        </Route>

        <Route path="/orders">
          <Route index element={<Orders/>}/>
          <Route path="order-details/:id" element={<OrderDetails/>}/>
        </Route>
        </Route>
        <Route path="/message" element={<Message/>} />

      </Route>
    )

  )

  return (
    <div className="App" style={{display:'flex', flexWrap:'wrap'}}>
      <RouterProvider router={router}/>

    </div>
  )
}

export default App
