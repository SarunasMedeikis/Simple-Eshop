import React, { useEffect } from "react";
import Link from '@material-ui/core/Link';
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box"
import { Grid, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';

// Importing user context
import {UserContext} from "../Providers/UserProvider"
import { db, getCartDocuments } from "./Firebase/firebase";


import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menu: {
		marginRight: "6rem",
		marginLeft: "6rem",
	},
	linkSpacing: {
		marginRight: theme.spacing(4),
	},
	menuNavLeft: {
		marginRight: "6rem",
	},
	gutterFromTop: {
		marginBottom: theme.spacing(3),
	},
	// Drawer
	drawerRoot: {
		display: "flex",
		
	},
	drawerBox:{
		width:drawerWidth,
		display:"flex",
		flexDirection:"column"
	},
	// CART 
	cartItem:{
		width:"150px",
		height:"100px"
	},
	cartFlex:{
		display:"flex",
		flexDirection:"row",
		marginLeft: "20px",
		marginRight: "20px",
		marginTop:"20px",
	},
	cartItemGap:{
		display:"flex",
		justifyContent:"space-evenly",
		flexDirection:"column",
		alignItems:"center"
	},
	cartItemsImage:{
		justifyContent:"center",
		display:"flex"
	},
	cartItemDivider:{
		marginTop:"20px"
	},
	shoppingCartItem:{
		display: "flex",
		flexDirection:"row",
		width:"100%",
		marginTop:theme.spacing(1)
	},
	drawerHeader:{
		display:"flex",
		justifyContent:"space-between",
		alignItems: "center",
		marginRight:"5%",
		marginLeft:"5%"
	},
	alignShoppingCartItem:{
		textAlign: "center"
	},
	displayFlexTotal:{
		display:"flex",
		justifyContent: "end",
		flexGrow: 1,
		marginRight: theme.spacing(2)
	},
	drawerWidth:{
		width: "25%"
	}
}));
  


const Navigation = (props) => {
	const user = React.useContext(UserContext);
	const classes = useStyles();
	const { history } = props;

	const handleMenuClick = (pageURL) => {
		history.push(pageURL);
	};

	const [cartItems, setCartItems] = React.useState(0);

	useEffect(()=>{
		readCartItems(user.uid)
	},[user.uid])
	// Read data
	const readCartItems = (userId) => {
		let userRef = db
			.collection("users")
			.doc(userId)
			.collection("cart");
		userRef.onSnapshot((snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setCartItems(data);
		});
	};

	const [open, setOpen] = React.useState(false);


	const [cart, setCart] = React.useState([]);
	React.useEffect(() => {
		getCartDocuments(user.uid)
			.then((res) => {
				console.log("res", res);
				setCart(res);
			})
			.catch((e) => {
				console.log("Error getting cart ", e);
			});
	}, [user.uid]);


	return (
		<div className={`${classes.root} ${classes.gutterFromTop}`}>
			<AppBar position='static' color='transparent'>
				<Toolbar disableGutters={true} variant='dense'>
					<Typography variant='h6' className={classes.menu}>
						TeaStore
					</Typography>
					<Link
						className={classes.linkSpacing}
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/")}>
						Home
					</Link>
					<Link
						className={classes.linkSpacing}
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/tea")}>
						Tea
					</Link>
					<Link
						className={classes.linkSpacing}
						variant='button'
						color='inherit'
						onClick={() => handleMenuClick("/coffee")}>
						Coffee
					</Link>
					<Link
						className={classes.root}
						variant='button'
						color='inherit'
						onClick={() => handleMenuClick("/about")}>
						About
					</Link>
					<IconButton aria-label='search' color='inherit'>
						<SearchIcon />
					</IconButton>
					<IconButton
						aria-label='search'
						color='inherit'
						onClick={() =>
							user
								? handleMenuClick("/profile")
								: handleMenuClick("/signin")
						}>
						<PersonIcon />
					</IconButton>
					<IconButton aria-label='search' color='inherit'>
						<FavoriteIcon />
					</IconButton>
					<IconButton
						className={classes.menuNavLeft}
						aria-label='search'
						color='inherit'
						onClick={() => setOpen(true)}>
						<Badge
							color='secondary'
							badgeContent={cartItems.length}>
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			{open ? (
				<CartDrawer open={open} setOpen={setOpen} cart={cart} />
			) : null}
		</div>
	);
}


const CartDrawer = ({open, setOpen, cart}) => {
	const classes = useStyles();
	const user = React.useContext(UserContext)
	const [quantity, setQuantity] = React.useState(1)
	const [sortedCart, setSortedCart] = React.useState([]);
	
	const toggleDrawer = () => (event) => {
			if (
				event.type === "keydown" &&
				(event.key === "Tab" || event.key === "Shift")
			) {
				return;
			}
			setOpen(false);
		};	


	function handleChange(event){
		setQuantity(event.target.value)
	}
	
	function handleDrawerClose(){
		setOpen(false);
	}
	
	

	return (
		<div className={classes.drawerRoot}>
			<Drawer
				classes={{paperAnchorRight: classes.drawerWidth}}
				anchor='right'
				open={open}
				onClose={toggleDrawer(false)}>
					<Box className={classes.drawerHeader} >
						<Typography variant="h5">Your shopping basket</Typography>
						<IconButton color="inherit" aria-label="close-drawer" onClick={handleDrawerClose} edge="end">
							<CloseIcon />
						</IconButton>
					</Box>
					<Divider />
				<Grid container >
					{cart.map((item) => {
						return (
							<Box className={classes.shoppingCartItem}>
								<Grid
									item
									xs={5}
									className={
										classes.cartItemsImage
									}>
									<img
										src={item.photo}
										alt={item.title}
										className={classes.cartItem}
									/>
								</Grid>
								<Grid
									item
									xs={5}
									className={classes.alignShoppingCartItem}
									>
									<Typography variant='body1'>
										{item.title}
									</Typography>
									<FormControl variant='outlined'>
										<InputLabel id='demo-simple-select-outlined-label'>
											Quantity
										</InputLabel>
										<Select
											labelId='quantity-select'
											id='quantity-select'
											value={quantity}
											onChange={handleChange}
											label='Quantity'>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											<MenuItem value={50}>
												50g
											</MenuItem>
											<MenuItem value={100}>
												100g
											</MenuItem>
											<MenuItem value={150}>
												150g
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid
									item
									xs={2}
									className={classes.alignShoppingCartItem}
									>
									<IconButton aria-label='delete'>
										<DeleteIcon fontSize='small' />
									</IconButton>
									<Typography variant='body1'>
										€ {item.price}
									</Typography>
								</Grid>
							</Box>
						);
					})}
					<Divider />
								<Box className={classes.displayFlexTotal}>
									<Typography variant="h6">
										Total : € 100.0
									</Typography>
								</Box>
				</Grid>
			</Drawer>
		</div>
	);
}


export default withRouter(Navigation);