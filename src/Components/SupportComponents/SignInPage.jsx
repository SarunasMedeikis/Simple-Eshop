import React from "react";

import { auth } from "../Firebase/firebase";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "25%",
	},
	centerFlex: {
		display: "flex",
		justifyContent: "center",
	},
}));

const INITIAL_STATE = {
	email: "",
	pw1: "",
	error: null,
};

const SignInPage = () => {
	const classes = useStyles();
	const [signIn, setSignIn] = React.useState(INITIAL_STATE);
	console.log(signIn);
	React.useEffect(() => {
		console.log(signIn);
	}, [signIn]);
	const handleChange = (event) => {
		setSignIn({
			...signIn,
			[event.target.name]: event.target.value,
		});
	};

    const signInWithEmailAndPasswordHandler = (event) => {
        event.preventDefault();
         auth.signInWithEmailAndPassword(signIn.email, signIn.pw1).catch(error => {
             setSignIn.error("Error signing in with password and email");
             console.error("Error signing in with password and email", error)
         })
    }

	return (
		<form
			onSubmit={signInWithEmailAndPasswordHandler}
			noValidate
			autoComplete='on'
			className={classes.centerFlex}>
			<div className={classes.root}>
				<Typography variant='h5' component='h5'>
					Sign In
				</Typography>
				<TextField
					required
					id='register-email'
					label='Email'
					margin='normal'
					variant='outlined'
					type='email'
					name='email'
					value={signIn.email}
					onChange={handleChange}
				/>
				<TextField
					required
					id='register-password'
					label='Password'
					type='password'
					autoComplete='current-password'
					margin='normal'
					variant='outlined'
					name='pw1'
					value={signIn.pw1}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'>
					Submit
				</Button>
			</div>
			{signIn.error && <p>{signIn.error.message}</p>}
		</form>
	);
};

export default SignInPage;