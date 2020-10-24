import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth, addUserDataToDb } from "../Firebase/firebase";
import { useHistory } from "react-router-dom";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
	dobTextField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	dobSpacing: {
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
}));

const INITIAL_STATE = {
	username: "",
	email: "",
	pw1: "",
	pw2: "",
	error: null,
};

const getTime = () => {
	let dateNow = new Date();
	let fullDate =
		dateNow.getFullYear() +
		"-" +
		(dateNow.getMonth() + 1) +
		"-" +
		dateNow.getDate();
	console.log(fullDate);
	return fullDate;
};

const SignUpPage = () => {
	const classes = useStyles();
	const [signUp, setSignUp] = React.useState(INITIAL_STATE);
	const [gender, setGender] = React.useState("female");
	const [dob, setDob] = React.useState("");
	let history = useHistory();

	const handleRedirect = () => {
		history.push("/profile");
	};

	const handleChange = (event) => {
		setSignUp({
			...signUp,
			[event.target.name]: event.target.value,
		});
	};

	const createUserWithEmailAndPasswordHandler = async (event) => {
		event.preventDefault();
		await auth
			.createUserWithEmailAndPassword(signUp.email, signUp.pw1)
			.then(() => {
				const tempUser = {
					email: signUp.email,
					username: signUp.username,
					gender: gender,
					dob: dob,
					createdAt: getTime(),
				};
				addUserDataToDb(tempUser);
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
		// reset data fields
		setSignUp(INITIAL_STATE);
		setDob("");
	};

	const isInvalid =
		signUp.pw1 !== signUp.pw2 ||
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
				<GenderChoice gender={gender} setGender={setGender} />
				<DateOfBirthChoice dob={dob} setDob={setDob} />
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

const GenderChoice = ({ gender, setGender }) => {
	const handleChange = (event) => {
		setGender(event.target.value);
	};

	return (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>Gender</FormLabel>
			<RadioGroup
				aria-label='gender'
				name='gender1'
				value={gender}
				onChange={handleChange}>
				<FormControlLabel
					value='Female'
					control={<Radio />}
					label='Female'
				/>
				<FormControlLabel
					value='Male'
					control={<Radio />}
					label='Male'
				/>
				<FormControlLabel
					value='other'
					control={<Radio />}
					label='Other'
				/>
			</RadioGroup>
		</FormControl>
	);
};

const DateOfBirthChoice = ({ dob, setDob }) => {
	const classes = useStyles();
	const handleChange = (e) => {
		setDob(e.target.value);
	};

	return (
		<Box className={classes.dobSpacing}>
			<TextField
				id='date'
				label='Birthday'
				type='date'
				defaultValue='2020-10-20'
				className={classes.dobTextField}
				InputLabelProps={{
					shrink: true,
				}}
				onChange={(e) => handleChange(e)}
			/>
		</Box>
	);
};

export default SignUpPage;
