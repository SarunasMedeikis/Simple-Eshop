import { RouterSharp } from "@material-ui/icons";
import React from "react";
import Routes from "./Components/Routes";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import Navigation from "./Components/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Components/Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		marginRight: "6rem",
		marginLeft: "6rem",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div>
			<Navigation />
			<div className={classes.root}>
				<Switch>
					{Routes.map((destination,i) => {
						return (
							<Route
								key={i}
								exact
								path={destination.path}
								render={() => <destination.component />}
							/>
						);
					})}
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
