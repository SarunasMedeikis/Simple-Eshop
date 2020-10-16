import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

const CheckForUser = () => {
    let user = useContext(UserContext);
    console.log("USER" );
    console.log(user);
    return user;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			<CheckForUser /> ? <Component {...props} /> : <Redirect to='/signin' />
		}
	/>
);

export default PrivateRoute;
