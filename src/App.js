import React, { useContext } from "react";
import Routes from "./Components/Routes";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Navigation from "./Components/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import {UserContext} from "./Providers/UserProvider"

const useStyles = makeStyles((theme) => ({
	root: {
		marginRight: "6rem",
		marginLeft: "6rem",
	},
}));

function App() {
	const user = useContext(UserContext);

	const classes = useStyles();
	return (
		<div>
			<Navigation />
			<div className={classes.root}>
				<Switch>
					{Routes.map((destination,i) => {
						if(destination.publicRoute){
							return <Route
								key={i}
								exact
								path={destination.path}
								render={() => <destination.component />}
							/>
						}else{
							return (
								<PrivateRoute
								key={i}
									exact
									path={destination.path}
									component={
										<destination.component />
									}
								/>
							);
						}

					})}

				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
