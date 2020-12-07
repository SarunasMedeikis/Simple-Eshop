import React from "react";
import Routes from "./Components/Routes";
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
			<Routes />
			</div>
			<Footer />
		</div>
	);
}

export default App;
