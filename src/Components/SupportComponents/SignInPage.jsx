import React from "react";
import { auth } from "../Firebase/firebase";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import {Link as RouterLink} from "react-router-dom"
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "25%",
	},
	centerFlex: {
		display: "flex",
		flexDirection: "column",
	},
	centerItemsFlex: {
		display: "flex",
		justifyContent: "center",
	},
	buttonMargin:{
		marginBottom:theme.spacing(3)
	}
}));

const INITIAL_STATE = {
	email: "",
	pw1: "",
	error: null,
};

const SignInPage = () => {
	const classes = useStyles();
	const [signIn, setSignIn] = React.useState(INITIAL_STATE);
	let history = useHistory();

	const handleRedirect = (place) => {
		history.push(place);
	};
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
         auth.signInWithEmailAndPassword(signIn.email, signIn.pw1).then(()=>{
			 console.log("LOG IN SUCCESFULL")
			handleRedirect("/profile");
		 }).catch(e => {
             console.error("Error signing in with password and email", e)
         })
    }

	return (
		<Box className={classes.centerFlex}>
			<form
				onSubmit={signInWithEmailAndPasswordHandler}
				noValidate
				autoComplete='on'
				className={classes.centerItemsFlex}>
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
						className={classes.buttonMargin}
						type='submit'
						variant='contained'
						color='primary'>
						Submit
					</Button>
					<Typography variant='body1' component='p'>
						<Link
							component={RouterLink}
							to='/passwordforgot'>
							Forgot password?
						</Link>
					</Typography>
					<Typography
						variant='body1'
						component='p'
						gutterBottom={true}>
						<Link component={RouterLink} to='/signup'>
							Do not have an account?
						</Link>
					</Typography>
				</div>

				{signIn.error && <p>{signIn.error.message}</p>}
			</form>
		</Box>
	);
};

export default SignInPage;