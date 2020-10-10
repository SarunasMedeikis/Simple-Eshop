import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

// import routes

import Home from "./Home";
import Tea from "./Tea";
import Coffee from "./Coffee";
import ShoppingCart from "./ShoppingCart";
import Product from "./Product";
import SignInPage from "./SupportComponents/SignInPage";
import SignUpPage from "./SupportComponents/SignUpPage";
import PasswordForgetPage from "./SupportComponents/PasswordForgetPage";

const Routes = [
	{
		path: "/",
		sidebarName: "Home",
		component: Home,
	},
	{
		path: "/tea",
		sidebarName: "Tea",
		component: Tea,
	},
	{
		path: "/cart",
		sidebarName: "Shopping Cart",
		component: ShoppingCart,
	},
	{
		path: "/coffee",
		sidebarName: "Coffee",
		component: Coffee,
	},
	{
		path: "/product/:id",
		sidebarName: "Product",
		component: Product,
	},
	{
		path: "/signin",
		sidebarName: "Sign In",
		component: SignInPage,
	},
	{
		path: "/signup",
		sidebarName: "Sign Up",
		component: SignUpPage,
	},
	{
		path: "/passwordForget",
		sidebarName: "Password Forget",
		component: PasswordForgetPage,
	},
];

export default Routes;
