import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {auth, addUserDataToDb} from "../Firebase/firebase"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
    display:"flex",
    flexDirection: "column",
    width:"25%"
    },
    centerFlex:{
        display:"flex",
        justifyContent:"center"
    }
}))

const INITIAL_STATE = {
    username: "",
    email: "",
    pw1: "",
    pw2: "",
    error: null,
}

const SignUpPage = () => {
	const classes = useStyles();
	const [signUp, setSignUp] = React.useState(INITIAL_STATE);
	let history = useHistory();

	const handleRedirect = () =>{
		history.push("/profile")
	}
    console.log(signUp)
    const handleChange = (event) =>{
        setSignUp({...signUp, [event.target.name]:event.target.value})
    }

	const createUserWithEmailAndPasswordHandler =(event) => {
		event.preventDefault();

		auth.createUserWithEmailAndPassword(signUp.email, signUp.pw1).then(() =>{

			addUserDataToDb({
				email: signUp.email,
				username: signUp.username,
			});
			//Redirect user back.
			handleRedirect();
		})
			.catch((error) => {
				setSignUp({
					...signUp,
					error: error,
				});
				console.error(error);
			});

		setSignUp(INITIAL_STATE);

	}

    const isInvalid = signUp.pw1 !== signUp.pw2 ||
                    signUp.pw1 === "" ||
                    signUp.email === "" ||
                    signUp.username === "";
	return (
		<form
			onSubmit={createUserWithEmailAndPasswordHandler}
			noValidate
			autoComplete='on'
			className={classes.centerFlex}>
			<div className={classes.root}>
				<Typography variant='h5' component='h5'>
					Registration
				</Typography>
				<TextField
					required
					id='register-username'
					label='Username'
					margin='normal'
					variant='outlined'
					name='username'
					value={signUp.username}
					onChange={handleChange}
				/>
				<TextField
					required
					id='register-email'
					label='Email'
					margin='normal'
					variant='outlined'
					type='email'
					name='email'
					value={signUp.email}
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
					value={signUp.pw1}
					onChange={handleChange}
				/>
				<TextField
					required
					id='register-password'
					label='Confirm Password'
					type='password'
					autoComplete='current-password'
					margin='normal'
					variant='outlined'
					name='pw2'
					value={signUp.pw2}
					onChange={handleChange}
				/>
				<Button
					disabled={isInvalid}
					type='submit'
					variant='contained'
					color='primary'>
					Submit
				</Button>
			</div>
			{signUp.error && <p>{signUp.error.message}</p>}
		</form>
	);
};



export default SignUpPage;