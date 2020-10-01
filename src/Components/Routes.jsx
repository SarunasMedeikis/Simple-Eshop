import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import routes

import Home from "./Home"
import Products from "./Products"
import ShoppingCart from "./ShoppingCart"


const Routes = [
    {
        path: "/",
		sidebarName: "Home",
		component: Home,
    },
    {
        path: "/products",
		sidebarName: "Products",
		component: Products,
    },
    {
        path: "/cart",
		sidebarName: "Shopping Cart",
		component: ShoppingCart,
    }
]

export default Routes;