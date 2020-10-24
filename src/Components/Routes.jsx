import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";


// import routes

import Home from "./Home";
import Tea from "./Tea";
import Coffee from "./Coffee";
import ShoppingCart from "./ShoppingCart";
import Product from "./Product";
import SignInPage from "./SupportComponents/SignInPage";
import SignUpPage from "./SupportComponents/SignUpPage";
import PasswordForgetPage from "./SupportComponents/PasswordForgetPage";
import ProfilePage from "./SupportComponents/ProfilePage";
import Page404 from "./SupportComponents/404";

const Routes = () => {
	const user = React.useContext(UserContext);
	return (
		<>
			<Switch>
				<Route exact path='/' render={(props) => <Home {...props} />}  />
				<Route exact path='/tea' render={()=><Tea /> } />
				<Route exact path='/cart' render={()=> <ShoppingCart />} />
				<Route exact path='/coffee' render={()=> <Coffee />} />
				<Route exact path='/product/:id' render={()=> <Product />} />
				<Route exact path='/signin' render={()=> user?<Redirect to="/profile"/> : <SignInPage />} />
				<Route exact path='/signup' render={()=> user?<Redirect to="/profile"/> : <SignUpPage />} />
				<Route exact path='/passwordforget' render={()=> user?<ProfilePage/> : <PasswordForgetPage/>} />
				<PrivateRoute exact path="/profile" >
           		 <ProfilePage />
					 </PrivateRoute>
				{/* If nothing matches render 404 */}

				<Route render={Page404} />
			</Switch>
		</>
	);
}


function PrivateRoute({ children, ...rest }) {
		const user = React.useContext(UserContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/signin",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}
export default Routes;
