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
import ProfilePage from "./SupportComponents/ProfilePage"


const Routes = [
	{
		publicRoute: true,
		path: "/",
		sidebarName: "Home",
		component: Home,
	},
	{
		publicRoute: true,
		path: "/tea",
		sidebarName: "Tea",
		component: Tea,
	},
	{
		publicRoute: true,
		path: "/cart",
		sidebarName: "Shopping Cart",
		component: ShoppingCart,
	},
	{
		publicRoute: true,
		path: "/coffee",
		sidebarName: "Coffee",
		component: Coffee,
	},
	{
		publicRoute: true,
		path: "/product/:id",
		sidebarName: "Product",
		component: Product,
	},
	{
		publicRoute: true,
		path: "/signin",
		sidebarName: "Sign In",
		component: SignInPage,
	},
	{
		publicRoute: true,
		path: "/signup",
		sidebarName: "Sign Up",
		component: SignUpPage,
	},
	{
		publicRoute: true,
		path: "/passwordForget",
		sidebarName: "Password Forget",
		component: PasswordForgetPage,
	},
	{
		publicRoute: false,
		path: "/profile",
		sidebarName: "Profile page",
		component: ProfilePage,
	},
];

export default Routes;
