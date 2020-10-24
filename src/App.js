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
			<Routes />
			</div>
			<Footer />
		</div>
	);
}

export default App;
