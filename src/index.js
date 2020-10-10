import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"

import Firebase , { FirebaseContext } from "./Components/Firebase";


// For colours
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#bdbdbd",
		},
		secondary: {
			main: "#ccff90",
		},
	},
});



ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<FirebaseContext.Provider value={new Firebase()}>
				<App />
			</FirebaseContext.Provider>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
