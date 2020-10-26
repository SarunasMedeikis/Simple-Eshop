import React from "react";
import { UserContext } from "../../Providers/UserProvider";
import {
	auth,
	readData,
	readUserOrders,
	updateOrderInfo,
	addAddressToDb,
	readUserAddress,
	updateAddressInformation,
	addNewPaymentCardToDB,
	readUserCards,
} from "../Firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	ordersFirstSeparation: {
		marginBottom: theme.spacing(1),
	},
	ordersFlex: {
		display: "flex",
		flexGrow: 1,
		justifyContent: "space-between",
		borderBottom: "5px solid #ccff90",
		borderRadius: "18px",
		marginBottom: theme.spacing(2),
	},
	ordersColumn: {
		display: "flex",
		flexDirection: "column",
	},
	// PROFILE
	profileFlex: {
		display: "flex",
		flexDirection: "column",
	},
	largeAvatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	// ADDRESS
	marginForCountry: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	AddressCardRoot: {
		maxWidth: 345,
	},
	AddressExpand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	AddressExpandOpen: {
		transform: "rotate(180deg)",
	},
	// Payments
	paymentsForm: {
		display: "flex",
		flexDirection: "column",
		width: "25ch",
		margin: theme.spacing(1),
	},
}));

const ProfilePage = () => {
	const user = React.useContext(UserContext);

	const [toDisplay, setToDisplay] = React.useState("Profile");
	const signUserOutHandler = () => {
		auth.signOut()
			.then(() => {
				console.log("LOG OUT SUCCESSFUL");
				console.log("CURRENT USER" + user.uid);
			})
			.catch((e) => {
				console.log("PROBLEM WITH SIGN OUT");
				console.error(e);
			});
	};
	function rendering() {
		if (toDisplay === "Profile") {
			console.log(toDisplay);
			return <Profile />;
		} else if (toDisplay === "Orders") {
			return <Orders />;
		} else if (toDisplay === "Addresses") {
			return <Addresses />;
		} else if (toDisplay === "Payments") {
			return <Payments />;
		} else if (toDisplay === "SignOut") {
			return signUserOutHandler();
		}
	}
	return (
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<List>
					<ListItem
						button
						onClick={() => setToDisplay("Profile")}>
						<ListItemText primary='Profile' />
					</ListItem>
					<ListItem
						button
						onClick={() => setToDisplay("Orders")}>
						<ListItemText primary='Orders' />
					</ListItem>
					<ListItem
						button
						onClick={() => setToDisplay("Addresses")}>
						<ListItemText primary='Addresses' />
					</ListItem>
					<ListItem
						button
						onClick={() => setToDisplay("Payments")}>
						<ListItemText primary='Payments' />
					</ListItem>
					<ListItem button>
						<ListItemText primary='WishLists' />
					</ListItem>
					<Divider />
					<ListItem
						button
						onClick={() => setToDisplay("SignOut")}>
						<ListItemText primary='Sign Out' />
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={10}>
				{rendering()}
			</Grid>
		</Grid>
	);
};

const Profile = () => {
	const user = React.useContext(UserContext);
	const [profileData, setProfileData] = React.useState({
		username: "",
		email: "",
		dob: "",
		createdAt: "",
		gender: "",
	});
	React.useEffect(() => {
		readData(user.uid).then((res) => {
			setProfileData({
				username: res.username,
				email: res.email,
				dob: res.dob,
				createdAt: res.createdAt,
				gender: res.gender,
			});
		});
	}, [user.uid]);

	const classes = useStyles();
	const [ProfileInfo, setProfileInfo] = React.useState(profileData);
	const updateProfileHandler = () => {
		// SET UP UPDATE INFORMATION IN DB HERE
		return;
	};
	const handleChange = (event) => {
		return setProfileData({
			...profileData,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<>
			<Typography variant='h4'>Profile</Typography>
			<Grid container>
				<Grid item xs={5} className={classes.profileFlex}>
					<Avatar
						alt={
							profileData.username
								? profileData.username
								: "User"
						}
						src='/static/images/avatar/1.jpg'
						className={classes.largeAvatar}
					/>
					<Typography variant='body1'>
						Member since: {profileData.createdAt}
					</Typography>
					<Typography variant='body1'>
						{profileData.gender}
					</Typography>
					<Typography variant='body1'>
						Date of birth: {profileData.dob}
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<form
						className={classes.profileFlex}
						onSubmit={updateProfileHandler}
						noValidate
						autoComplete='on'>
						<TextField
							id='profileinfo-username'
							label='username'
							margin='normal'
							variant='outlined'
							type='username'
							name='username'
							value={profileData.username}
							onChange={handleChange}
						/>
						<TextField
							id='profileinfo-email'
							label='email'
							margin='normal'
							variant='outlined'
							type='email'
							name='email'
							value={profileData.email}
							onChange={handleChange}
						/>
						<TextField
							id='profileinfo-password'
							label='password'
							type='password'
							autoComplete='current-password'
							margin='normal'
							variant='outlined'
							name='pw1'
							value={ProfileInfo.pw1}
							onChange={handleChange}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'>
							Submit
						</Button>
					</form>
				</Grid>
			</Grid>
		</>
	);
};

const Orders = () => {
	const user = React.useContext(UserContext);
	const [received, setReceived] = React.useState(false);
	const [orderData, setOrderData] = React.useState([]);
	React.useEffect(() => {
		console.log("USE EFFECT IS TRIGGERED");
		readUserOrders(user.uid).then((res) => {
			setOrderData(res);
			console.log("res", res);
		});
	}, [received, user.uid]);
	const classes = useStyles();
	return (
		<>
			<Typography variant='h4'>Orders</Typography>
			<Typography
				variant='body2'
				className={classes.ordersFirstSeparation}>
				{orderData.length} items
			</Typography>
			<Grid container spacing={1}>
				{orderData.map((order) => {
					return (
						<SingularOrder
							key={order.orderNumber}
							classes={classes}
							order={order}
							received={received}
							setReceived={setReceived}
							user={user}
						/>
					);
				})}
			</Grid>
		</>
	);
};

const SingularOrder = ({
	classes,
	order,
	received,
	setReceived,
	user,
}) => {
	const [ButtonDisable, setButtonDisable] = React.useState(false);
	return (
		<Grid item xs={12} className={classes.ordersFlex}>
			<Box>
				<Typography variant='h5'>
					Order # {order.orderNumber}{" "}
				</Typography>
				<Link component={RouterLink} to='#'>
					View Order
				</Link>
			</Box>
			<Box>
				<Typography variant='body1'>
					Order placed: {order.orderPlaced.seconds}
				</Typography>
				<Typography variant='body1'>
					Order Status: {order.orderStatus}
				</Typography>
			</Box>
			<Box className={classes.ordersColumn}>
				<Button
					variant='contained'
					color='secondary'
					disabled={ButtonDisable || order.orderReceived}
					onClick={() => {
						updateOrderInfo(
							user.uid,
							order.orderNumber,
						).then(() => {
							setReceived(true);
						});

						setButtonDisable(true);
					}}>
					Item received
				</Button>
				<Button variant='outlined' disabled>
					Open Dispute
				</Button>
				<Typography variant='caption'>
					Cannot open dispute for another: 10 hours
				</Typography>
			</Box>
		</Grid>
	);
};

const Addresses = () => {
	const classes = useStyles();
	const user = React.useContext(UserContext);
	const [address, setAddress] = React.useState({
		addressLine1: "",
		addressLine2: "",
		phone: "+000 000 000",
		country: "",
		firstName: "",
		lastName: "",
		postCode: "",
	});

	const addAddressToDbHandler = async (event) => {
		event.preventDefault();
		const tempAddress = {
			addressLine1: address.addressLine1,
			addressLine2: address.addressLine2,
			phone: address.phone,
			country: address.country,
			firstName: address.firstName,
			lastName: address.lastName,
			postCode: address.postCode,
		};
		await addAddressToDb(tempAddress)
			.then(() => {
				console.log("SUCCESS");
			})
			.catch((e) => {
				console.log("ERRRR");
			});
	};
	const handleChange = (event) => {
		return setAddress({
			...address,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<Typography variant='h5'>
					Add delivery address
				</Typography>
				<form
					className={classes.profileFlex}
					onSubmit={addAddressToDbHandler}
					noValidate
					autoComplete='on'>
					<TextField
						id='address-firstname'
						label='Firstname'
						margin='normal'
						variant='outlined'
						type='firstname'
						name='firstName'
						value={address.firstName}
						onChange={handleChange}
					/>
					<TextField
						id='address-lastname'
						label='Lastname'
						margin='normal'
						variant='outlined'
						type='lastname'
						name='lastName'
						value={address.lastName}
						onChange={handleChange}
					/>
					<TextField
						id='address-line1'
						label='Address Line 1'
						type='address1'
						margin='normal'
						variant='outlined'
						name='addressLine1'
						value={address.addressLine1}
						onChange={handleChange}
					/>
					<TextField
						id='address-line2'
						label='Address Line 2'
						type='address2'
						margin='normal'
						variant='outlined'
						name='addressLine2'
						value={address.addressLine2}
						onChange={handleChange}
					/>
					<TextField
						id='address-phone'
						label='Phone Number'
						type='phone'
						margin='normal'
						variant='outlined'
						name='phone'
						value={address.phone}
						onChange={handleChange}
					/>
					<TextField
						id='address-postcode'
						label='Postcode'
						type='postcode'
						margin='normal'
						variant='outlined'
						name='postCode'
						value={address.postcode}
						onChange={handleChange}
					/>

					<CountrySelect
						address={address}
						setAddress={setAddress}
						handleChange={handleChange}
					/>

					<Button
						type='submit'
						variant='contained'
						color='primary'>
						Submit
					</Button>
				</form>
			</Grid>
			<Grid item xs={6}>
				<Typography variant='h5'>Other addresses</Typography>
				<DisplayOtherAddresses />
			</Grid>
		</Grid>
	);
};

const DisplayOtherAddresses = () => {
	const user = React.useContext(UserContext);
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [allAddresses, setAllAddresses] = React.useState([]);

	React.useEffect(() => {
		readUserAddress(user.uid).then((res) => {
			setAllAddresses(res);
			console.log(res);
		});
	}, [user.uid]);

	const [updatedAddress, setUpdatedAddress] = React.useState({});

	const handleChange = (event) => {
		setUpdatedAddress({
			...updatedAddress,
			[event.target.name]: event.target.value,
		});
	};

	let itemId;
	const updateAddressInDbHandler = (event) => {
		event.preventDefault();
		const tempAddress = {
			addressLine1: updatedAddress.addressLine1,
			addressLine2: updatedAddress.addressLine2,
			phone: updatedAddress.phone,
			country: updatedAddress.country,
			firstName: updatedAddress.firstName,
			lastName: updatedAddress.lastName,
			postCode: updatedAddress.postCode,
		};
		updateAddressInformation(user.uid, itemId, tempAddress);
	};
	return allAddresses.map((item) => {
		itemId = item.id;
		return (
			<Card
				key={`${item.lastName}${item.phone}`}
				className={classes.AddressCardRoot}>
				<CardHeader
					title={`${item.firstName}  ${item.lastName}`}
					subheader={`${item.phone}`}
				/>
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.addressLine1}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.addressLine2}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.postCode}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.country}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography
							variant='body2'
							color='textSecondary'
							component='p'>
							Update address information
						</Typography>
						{/* TO UPDATE ADDRESS */}

						<form
							className={classes.profileFlex}
							onSubmit={updateAddressInDbHandler}
							noValidate
							autoComplete='on'>
							<TextField
								id='address-firstname'
								label='Firstname'
								margin='normal'
								variant='outlined'
								type='firstname'
								name='firstName'
								value={updatedAddress.firstName}
								onChange={handleChange}
							/>
							<TextField
								id='address-lastname'
								label='Lastname'
								margin='normal'
								variant='outlined'
								type='lastname'
								name='lastName'
								value={updatedAddress.lastName}
								onChange={handleChange}
							/>
							<TextField
								id='address-line1'
								label='Address Line 1'
								type='address1'
								margin='normal'
								variant='outlined'
								name='addressLine1'
								value={updatedAddress.addressLine1}
								onChange={handleChange}
							/>
							<TextField
								id='address-line2'
								label='Address Line 2'
								type='address2'
								margin='normal'
								variant='outlined'
								name='addressLine2'
								value={updatedAddress.addressLine2}
								onChange={handleChange}
							/>
							<TextField
								id='address-phone'
								label='Phone Number'
								type='phone'
								margin='normal'
								variant='outlined'
								name='phone'
								value={updatedAddress.phone}
								onChange={handleChange}
							/>
							<TextField
								id='address-postcode'
								label='Postcode'
								type='postcode'
								margin='normal'
								variant='outlined'
								name='postCode'
								value={updatedAddress.postcode}
								onChange={handleChange}
							/>

							<CountrySelect
								address={updatedAddress}
								setAddress={setUpdatedAddress}
							/>

							<Button
								type='submit'
								variant='contained'
								color='primary'>
								Submit
							</Button>
						</form>
					</CardContent>
				</Collapse>
			</Card>
		);
	});
};

const CountrySelect = ({ address, setAddress, handleChange }) => {
	const classes = useStyles();

	const [localCountry, setLocalCountry] = React.useState("");

	const handleLocalCountryChange = (event) => {
		setLocalCountry(event.target.value);
	};
	React.useEffect(() => {
		setAddress({ ...address, country: localCountry });
	}, [localCountry]);
	const countries = [
		{ code: "AD", label: "Andorra", phone: "376" },
		{ code: "AE", label: "United Arab Emirates", phone: "971" },
		{ code: "AF", label: "Afghanistan", phone: "93" },
		{ code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
		{ code: "AI", label: "Anguilla", phone: "1-264" },
		{ code: "AL", label: "Albania", phone: "355" },
		{ code: "AM", label: "Armenia", phone: "374" },
		{ code: "AO", label: "Angola", phone: "244" },
		{ code: "AQ", label: "Antarctica", phone: "672" },
		{ code: "AR", label: "Argentina", phone: "54" },
		{ code: "AS", label: "American Samoa", phone: "1-684" },
		{ code: "AT", label: "Austria", phone: "43" },
		{
			code: "AU",
			label: "Australia",
			phone: "61",
			suggested: true,
		},
		{ code: "AW", label: "Aruba", phone: "297" },
		{ code: "AX", label: "Alland Islands", phone: "358" },
		{ code: "AZ", label: "Azerbaijan", phone: "994" },
		{ code: "BA", label: "Bosnia and Herzegovina", phone: "387" },
		{ code: "BB", label: "Barbados", phone: "1-246" },
		{ code: "BD", label: "Bangladesh", phone: "880" },
		{ code: "BE", label: "Belgium", phone: "32" },
		{ code: "BF", label: "Burkina Faso", phone: "226" },
		{ code: "BG", label: "Bulgaria", phone: "359" },
		{ code: "BH", label: "Bahrain", phone: "973" },
		{ code: "BI", label: "Burundi", phone: "257" },
		{ code: "BJ", label: "Benin", phone: "229" },
		{ code: "BL", label: "Saint Barthelemy", phone: "590" },
		{ code: "BM", label: "Bermuda", phone: "1-441" },
		{ code: "BN", label: "Brunei Darussalam", phone: "673" },
		{ code: "BO", label: "Bolivia", phone: "591" },
		{ code: "BR", label: "Brazil", phone: "55" },
		{ code: "BS", label: "Bahamas", phone: "1-242" },
		{ code: "BT", label: "Bhutan", phone: "975" },
		{ code: "BV", label: "Bouvet Island", phone: "47" },
		{ code: "BW", label: "Botswana", phone: "267" },
		{ code: "BY", label: "Belarus", phone: "375" },
		{ code: "BZ", label: "Belize", phone: "501" },
		{ code: "CA", label: "Canada", phone: "1", suggested: true },
		{ code: "CC", label: "Cocos (Keeling) Islands", phone: "61" },
		{
			code: "CD",
			label: "Congo, Democratic Republic of the",
			phone: "243",
		},
		{
			code: "CF",
			label: "Central African Republic",
			phone: "236",
		},
		{ code: "CG", label: "Congo, Republic of the", phone: "242" },
		{ code: "CH", label: "Switzerland", phone: "41" },
		{ code: "CI", label: "Cote d'Ivoire", phone: "225" },
		{ code: "CK", label: "Cook Islands", phone: "682" },
		{ code: "CL", label: "Chile", phone: "56" },
		{ code: "CM", label: "Cameroon", phone: "237" },
		{ code: "CN", label: "China", phone: "86" },
		{ code: "CO", label: "Colombia", phone: "57" },
		{ code: "CR", label: "Costa Rica", phone: "506" },
		{ code: "CU", label: "Cuba", phone: "53" },
		{ code: "CV", label: "Cape Verde", phone: "238" },
		{ code: "CW", label: "Curacao", phone: "599" },
		{ code: "CX", label: "Christmas Island", phone: "61" },
		{ code: "CY", label: "Cyprus", phone: "357" },
		{ code: "CZ", label: "Czech Republic", phone: "420" },
		{
			code: "DE",
			label: "Germany",
			phone: "49",
			suggested: true,
		},
		{ code: "DJ", label: "Djibouti", phone: "253" },
		{ code: "DK", label: "Denmark", phone: "45" },
		{ code: "DM", label: "Dominica", phone: "1-767" },
		{ code: "DO", label: "Dominican Republic", phone: "1-809" },
		{ code: "DZ", label: "Algeria", phone: "213" },
		{ code: "EC", label: "Ecuador", phone: "593" },
		{ code: "EE", label: "Estonia", phone: "372" },
		{ code: "EG", label: "Egypt", phone: "20" },
		{ code: "EH", label: "Western Sahara", phone: "212" },
		{ code: "ER", label: "Eritrea", phone: "291" },
		{ code: "ES", label: "Spain", phone: "34" },
		{ code: "ET", label: "Ethiopia", phone: "251" },
		{ code: "FI", label: "Finland", phone: "358" },
		{ code: "FJ", label: "Fiji", phone: "679" },
		{
			code: "FK",
			label: "Falkland Islands (Malvinas)",
			phone: "500",
		},
		{
			code: "FM",
			label: "Micronesia, Federated States of",
			phone: "691",
		},
		{ code: "FO", label: "Faroe Islands", phone: "298" },
		{ code: "FR", label: "France", phone: "33", suggested: true },
		{ code: "GA", label: "Gabon", phone: "241" },
		{ code: "GB", label: "United Kingdom", phone: "44" },
		{ code: "GD", label: "Grenada", phone: "1-473" },
		{ code: "GE", label: "Georgia", phone: "995" },
		{ code: "GF", label: "French Guiana", phone: "594" },
		{ code: "GG", label: "Guernsey", phone: "44" },
		{ code: "GH", label: "Ghana", phone: "233" },
		{ code: "GI", label: "Gibraltar", phone: "350" },
		{ code: "GL", label: "Greenland", phone: "299" },
		{ code: "GM", label: "Gambia", phone: "220" },
		{ code: "GN", label: "Guinea", phone: "224" },
		{ code: "GP", label: "Guadeloupe", phone: "590" },
		{ code: "GQ", label: "Equatorial Guinea", phone: "240" },
		{ code: "GR", label: "Greece", phone: "30" },
		{
			code: "GS",
			label: "South Georgia and the South Sandwich Islands",
			phone: "500",
		},
		{ code: "GT", label: "Guatemala", phone: "502" },
		{ code: "GU", label: "Guam", phone: "1-671" },
		{ code: "GW", label: "Guinea-Bissau", phone: "245" },
		{ code: "GY", label: "Guyana", phone: "592" },
		{ code: "HK", label: "Hong Kong", phone: "852" },
		{
			code: "HM",
			label: "Heard Island and McDonald Islands",
			phone: "672",
		},
		{ code: "HN", label: "Honduras", phone: "504" },
		{ code: "HR", label: "Croatia", phone: "385" },
		{ code: "HT", label: "Haiti", phone: "509" },
		{ code: "HU", label: "Hungary", phone: "36" },
		{ code: "ID", label: "Indonesia", phone: "62" },
		{ code: "IE", label: "Ireland", phone: "353" },
		{ code: "IL", label: "Israel", phone: "972" },
		{ code: "IM", label: "Isle of Man", phone: "44" },
		{ code: "IN", label: "India", phone: "91" },
		{
			code: "IO",
			label: "British Indian Ocean Territory",
			phone: "246",
		},
		{ code: "IQ", label: "Iraq", phone: "964" },
		{
			code: "IR",
			label: "Iran, Islamic Republic of",
			phone: "98",
		},
		{ code: "IS", label: "Iceland", phone: "354" },
		{ code: "IT", label: "Italy", phone: "39" },
		{ code: "JE", label: "Jersey", phone: "44" },
		{ code: "JM", label: "Jamaica", phone: "1-876" },
		{ code: "JO", label: "Jordan", phone: "962" },
		{ code: "JP", label: "Japan", phone: "81", suggested: true },
		{ code: "KE", label: "Kenya", phone: "254" },
		{ code: "KG", label: "Kyrgyzstan", phone: "996" },
		{ code: "KH", label: "Cambodia", phone: "855" },
		{ code: "KI", label: "Kiribati", phone: "686" },
		{ code: "KM", label: "Comoros", phone: "269" },
		{
			code: "KN",
			label: "Saint Kitts and Nevis",
			phone: "1-869",
		},
		{
			code: "KP",
			label: "Korea, Democratic People's Republic of",
			phone: "850",
		},
		{ code: "KR", label: "Korea, Republic of", phone: "82" },
		{ code: "KW", label: "Kuwait", phone: "965" },
		{ code: "KY", label: "Cayman Islands", phone: "1-345" },
		{ code: "KZ", label: "Kazakhstan", phone: "7" },
		{
			code: "LA",
			label: "Lao People's Democratic Republic",
			phone: "856",
		},
		{ code: "LB", label: "Lebanon", phone: "961" },
		{ code: "LC", label: "Saint Lucia", phone: "1-758" },
		{ code: "LI", label: "Liechtenstein", phone: "423" },
		{ code: "LK", label: "Sri Lanka", phone: "94" },
		{ code: "LR", label: "Liberia", phone: "231" },
		{ code: "LS", label: "Lesotho", phone: "266" },
		{ code: "LT", label: "Lithuania", phone: "370" },
		{ code: "LU", label: "Luxembourg", phone: "352" },
		{ code: "LV", label: "Latvia", phone: "371" },
		{ code: "LY", label: "Libya", phone: "218" },
		{ code: "MA", label: "Morocco", phone: "212" },
		{ code: "MC", label: "Monaco", phone: "377" },
		{ code: "MD", label: "Moldova, Republic of", phone: "373" },
		{ code: "ME", label: "Montenegro", phone: "382" },
		{
			code: "MF",
			label: "Saint Martin (French part)",
			phone: "590",
		},
		{ code: "MG", label: "Madagascar", phone: "261" },
		{ code: "MH", label: "Marshall Islands", phone: "692" },
		{
			code: "MK",
			label: "Macedonia, the Former Yugoslav Republic of",
			phone: "389",
		},
		{ code: "ML", label: "Mali", phone: "223" },
		{ code: "MM", label: "Myanmar", phone: "95" },
		{ code: "MN", label: "Mongolia", phone: "976" },
		{ code: "MO", label: "Macao", phone: "853" },
		{
			code: "MP",
			label: "Northern Mariana Islands",
			phone: "1-670",
		},
		{ code: "MQ", label: "Martinique", phone: "596" },
		{ code: "MR", label: "Mauritania", phone: "222" },
		{ code: "MS", label: "Montserrat", phone: "1-664" },
		{ code: "MT", label: "Malta", phone: "356" },
		{ code: "MU", label: "Mauritius", phone: "230" },
		{ code: "MV", label: "Maldives", phone: "960" },
		{ code: "MW", label: "Malawi", phone: "265" },
		{ code: "MX", label: "Mexico", phone: "52" },
		{ code: "MY", label: "Malaysia", phone: "60" },
		{ code: "MZ", label: "Mozambique", phone: "258" },
		{ code: "NA", label: "Namibia", phone: "264" },
		{ code: "NC", label: "New Caledonia", phone: "687" },
		{ code: "NE", label: "Niger", phone: "227" },
		{ code: "NF", label: "Norfolk Island", phone: "672" },
		{ code: "NG", label: "Nigeria", phone: "234" },
		{ code: "NI", label: "Nicaragua", phone: "505" },
		{ code: "NL", label: "Netherlands", phone: "31" },
		{ code: "NO", label: "Norway", phone: "47" },
		{ code: "NP", label: "Nepal", phone: "977" },
		{ code: "NR", label: "Nauru", phone: "674" },
		{ code: "NU", label: "Niue", phone: "683" },
		{ code: "NZ", label: "New Zealand", phone: "64" },
		{ code: "OM", label: "Oman", phone: "968" },
		{ code: "PA", label: "Panama", phone: "507" },
		{ code: "PE", label: "Peru", phone: "51" },
		{ code: "PF", label: "French Polynesia", phone: "689" },
		{ code: "PG", label: "Papua New Guinea", phone: "675" },
		{ code: "PH", label: "Philippines", phone: "63" },
		{ code: "PK", label: "Pakistan", phone: "92" },
		{ code: "PL", label: "Poland", phone: "48" },
		{
			code: "PM",
			label: "Saint Pierre and Miquelon",
			phone: "508",
		},
		{ code: "PN", label: "Pitcairn", phone: "870" },
		{ code: "PR", label: "Puerto Rico", phone: "1" },
		{ code: "PS", label: "Palestine, State of", phone: "970" },
		{ code: "PT", label: "Portugal", phone: "351" },
		{ code: "PW", label: "Palau", phone: "680" },
		{ code: "PY", label: "Paraguay", phone: "595" },
		{ code: "QA", label: "Qatar", phone: "974" },
		{ code: "RE", label: "Reunion", phone: "262" },
		{ code: "RO", label: "Romania", phone: "40" },
		{ code: "RS", label: "Serbia", phone: "381" },
		{ code: "RU", label: "Russian Federation", phone: "7" },
		{ code: "RW", label: "Rwanda", phone: "250" },
		{ code: "SA", label: "Saudi Arabia", phone: "966" },
		{ code: "SB", label: "Solomon Islands", phone: "677" },
		{ code: "SC", label: "Seychelles", phone: "248" },
		{ code: "SD", label: "Sudan", phone: "249" },
		{ code: "SE", label: "Sweden", phone: "46" },
		{ code: "SG", label: "Singapore", phone: "65" },
		{ code: "SH", label: "Saint Helena", phone: "290" },
		{ code: "SI", label: "Slovenia", phone: "386" },
		{ code: "SJ", label: "Svalbard and Jan Mayen", phone: "47" },
		{ code: "SK", label: "Slovakia", phone: "421" },
		{ code: "SL", label: "Sierra Leone", phone: "232" },
		{ code: "SM", label: "San Marino", phone: "378" },
		{ code: "SN", label: "Senegal", phone: "221" },
		{ code: "SO", label: "Somalia", phone: "252" },
		{ code: "SR", label: "Suriname", phone: "597" },
		{ code: "SS", label: "South Sudan", phone: "211" },
		{ code: "ST", label: "Sao Tome and Principe", phone: "239" },
		{ code: "SV", label: "El Salvador", phone: "503" },
		{
			code: "SX",
			label: "Sint Maarten (Dutch part)",
			phone: "1-721",
		},
		{ code: "SY", label: "Syrian Arab Republic", phone: "963" },
		{ code: "SZ", label: "Swaziland", phone: "268" },
		{
			code: "TC",
			label: "Turks and Caicos Islands",
			phone: "1-649",
		},
		{ code: "TD", label: "Chad", phone: "235" },
		{
			code: "TF",
			label: "French Southern Territories",
			phone: "262",
		},
		{ code: "TG", label: "Togo", phone: "228" },
		{ code: "TH", label: "Thailand", phone: "66" },
		{ code: "TJ", label: "Tajikistan", phone: "992" },
		{ code: "TK", label: "Tokelau", phone: "690" },
		{ code: "TL", label: "Timor-Leste", phone: "670" },
		{ code: "TM", label: "Turkmenistan", phone: "993" },
		{ code: "TN", label: "Tunisia", phone: "216" },
		{ code: "TO", label: "Tonga", phone: "676" },
		{ code: "TR", label: "Turkey", phone: "90" },
		{ code: "TT", label: "Trinidad and Tobago", phone: "1-868" },
		{ code: "TV", label: "Tuvalu", phone: "688" },
		{
			code: "TW",
			label: "Taiwan, Province of China",
			phone: "886",
		},
		{
			code: "TZ",
			label: "United Republic of Tanzania",
			phone: "255",
		},
		{ code: "UA", label: "Ukraine", phone: "380" },
		{ code: "UG", label: "Uganda", phone: "256" },
		{
			code: "US",
			label: "United States",
			phone: "1",
			suggested: true,
		},
		{ code: "UY", label: "Uruguay", phone: "598" },
		{ code: "UZ", label: "Uzbekistan", phone: "998" },
		{
			code: "VA",
			label: "Holy See (Vatican City State)",
			phone: "379",
		},
		{
			code: "VC",
			label: "Saint Vincent and the Grenadines",
			phone: "1-784",
		},
		{ code: "VE", label: "Venezuela", phone: "58" },
		{
			code: "VG",
			label: "British Virgin Islands",
			phone: "1-284",
		},
		{ code: "VI", label: "US Virgin Islands", phone: "1-340" },
		{ code: "VN", label: "Vietnam", phone: "84" },
		{ code: "VU", label: "Vanuatu", phone: "678" },
		{ code: "WF", label: "Wallis and Futuna", phone: "681" },
		{ code: "WS", label: "Samoa", phone: "685" },
		{ code: "XK", label: "Kosovo", phone: "383" },
		{ code: "YE", label: "Yemen", phone: "967" },
		{ code: "YT", label: "Mayotte", phone: "262" },
		{ code: "ZA", label: "South Africa", phone: "27" },
		{ code: "ZM", label: "Zambia", phone: "260" },
		{ code: "ZW", label: "Zimbabwe", phone: "263" },
	];

	return (
		<FormControl
			variant='outlined'
			className={classes.marginForCountry}>
			<InputLabel id='address-country-label'>
				Country
			</InputLabel>
			<Select
				labelId='address-country-label'
				id='address-country-label'
				value={localCountry}
				onChange={handleLocalCountryChange}
				label='Country'>
				{countries.map((country) => {
					return (
						<MenuItem
							key={country.label}
							value={country.label}>
							{country.label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

const Payments = () => {
	const user = React.useContext(UserContext);
	const classes = useStyles();
	const [addCard, setAddCard] = React.useState({
		name: "",
		mmyy: "",
		cvc: "",
		cardNumber: "",
	});

	function handleChange(event) {
		setAddCard({
			...addCard,
			[event.target.name]: event.target.value,
		});
	}

	const addNewCardToDbHandler = (event) => {
		event.preventDefault();
		addNewPaymentCardToDB(user.uid, addCard)
			.then(console.log("Success"))
			.catch((e) => {
				console.log("error", e);
			});
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={5}>
				<form
					className={classes.paymentsForm}
					noValidate
					autoComplete='off'
					onSubmit={addNewCardToDbHandler}>
					<TextField
						id='standard-basic'
						label='Name on card'
						name='name'
						value={addCard.name}
						onChange={handleChange}
					/>
					<TextField
						id='standard-basic'
						label='Card Number'
						name='cardNumber'
						value={addCard.cardNumber}
						onChange={handleChange}
					/>
					<TextField
						id='standard-basic'
						label='MM/YY'
						name='mmyy'
						value={addCard.mmyy}
						onChange={handleChange}
					/>
					<TextField
						id='standard-basic'
						label='CVC'
						name='cvc'
						value={addCard.cvc}
						onChange={handleChange}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'>
						Add a new card
					</Button>
				</form>
			</Grid>
			<Grid item xs={5}>
				<DisplayAddedCards />
			</Grid>
		</Grid>
	);
};

const DisplayAddedCards = () => {
	const user = React.useContext(UserContext);
	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [allCards, setAllCards] = React.useState([]);

	React.useEffect(() => {
		readUserCards(user.uid).then((res) => {
			setAllCards(res);
			console.log(res);
		});
	}, [user.uid]);

	const [updatedCard, setUpdatedCard] = React.useState({});

	const handleChange = (event) => {
		setUpdatedCard({
			...updatedCard,
			[event.target.name]: event.target.value,
		});
	};

	let itemId;
	const updateAddressInDbHandler = (event) => {
		event.preventDefault();
		const tempCard = {
			name: updatedCard.name,
			mmyy: updatedCard.mmyy,
			cvc: updatedCard.cvc,
			cardNumber: updatedCard.cardNumber,
		};
		updateAddressInformation(user.uid, itemId, tempCard);
	};
	return allCards.map((item) => {
		itemId = item.id;
		return (
			<Card
				key={`${item.name}${item.cvc}`}
				className={classes.AddressCardRoot}>
				<CardHeader title={`${item.name}`} />
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.cardNumber}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.mmyy}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'>
						{item.cvc}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography
							variant='body2'
							color='textSecondary'
							component='p'>
							Update address information
						</Typography>
						{/* TO UPDATE PAYMENT CARD INFO */}

						<form
							className={classes.profileFlex}
							onSubmit={updateAddressInDbHandler}
							noValidate
							autoComplete='on'>
							<TextField
								id='address-firstname'
								label='Name on card'
								margin='normal'
								variant='outlined'
								type='name'
								name='name'
								value={updatedCard.name}
								onChange={handleChange}
							/>
							<TextField
								id='address-lastname'
								label='Card Number'
								margin='normal'
								variant='outlined'
								type='cardNumber'
								name='cardNumber'
								value={updatedCard.cardNumber}
								onChange={handleChange}
							/>
							<TextField
								id='address-line1'
								label='MMYY'
								type='mmyy'
								margin='normal'
								variant='outlined'
								name='mmyy'
								value={updatedCard.mmyy}
								onChange={handleChange}
							/>
							<TextField
								id='address-line2'
								label='CVC'
								type='cvc'
								margin='normal'
								variant='outlined'
								name='cvc'
								value={updatedCard.cvc}
								onChange={handleChange}
							/>

							<Button
								type='submit'
								variant='contained'
								color='primary'>
								Submit
							</Button>
						</form>
					</CardContent>
				</Collapse>
			</Card>
		);
	});
};

export default ProfilePage;
