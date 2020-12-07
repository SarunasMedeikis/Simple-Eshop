import React from "react";
import { CardActionArea, IconButton } from "@material-ui/core";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";


// Icons
import StarIcon from "@material-ui/icons/Star";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";


// For select Imports
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

// For Router
import { Link as RouterLink } from "react-router-dom";

// From firebase
import {addToCart} from "../Firebase/firebase"

// Importing user context
import {UserContext} from "../../Providers/UserProvider"



const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 304,
		height: 472,
	},
	media: {
		height: 176,
	},
	cardHeaderBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	formControl: {
		minWidth: 100,
		heigh: 48,
	},
	cardActionsCenter: {
        justifyContent: "space-evenly",
        alignItems: "self-end",
        paddingTop: theme.spacing(3)
	},
	price: {
		color: "#ff99bb",
		letterSpacing: "1.5px",
    },
    cardTextAlign:{
        textAlign:"center"
    },
    contentGutter:{
        marginBottom:theme.spacing(2)
    }
}));


const SingleTea = ({item}) =>{
	const user = React.useContext(UserContext);
	
	const addToCartHandler = (event, item) => {
		event.preventDefault();
		addToCart(user.uid, item).then(()=>{
			console.log("Added item to cart.");
		}).catch((e)=>{
			console.log("Error adding to cart", e);
		})
	}

    const [size, setSize] = React.useState("");
    const classes = useStyles();
    return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<Box className={classes.cardHeaderBox}>
						<Typography variant='subtitle1'>
							{item.rating}
						</Typography>
						<StarIcon />
					</Box>
				}></CardHeader>
			<CardActionArea component={RouterLink} to={`/product/${item.id}`}>
				<CardMedia
					className={classes.media}
					image={item.photo}
					title={item.title}
				/>
				<CardContent className={classes.contentGutter}>
					<Typography variant='h6' gutterBottom className={classes.cardTextAlign}>
						{item.title}
					</Typography>
					<Typography variant="caption" gutterBottom>
						{item.desc}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardActionsCenter}>
				<Typography variant='button' component='span'>
					<Box className={classes.price} fontWeight='800'>
						{" "}
						{item.price}€{" "}
					</Box>
				</Typography>
				<ChooseGrams size={size} setSize={setSize} />
				<IconButton className={classes.addToCart} onClick={(event) => addToCartHandler(event, item)}>
					<AddShoppingCartIcon className={classes.cartIcon} />
				</IconButton>
			</CardActions>
		</Card>
	);
}


const ChooseGrams = ({size, setSize}) =>{
    const classes = useStyles();

    const handleChange = (event) => {
        setSize(event.target.value);
    }

    return (
		<FormControl className={classes.formControl}>
			<InputLabel shrink htmlFor='tea-card-display'>
				Quantity
			</InputLabel>
			<NativeSelect
				value={size}
				onChange={handleChange}
				inputProps={{
					name: "tea",
					id: "tea-card-display",
				}}>
				<option value=''>None</option>
				<option value={50}>50g</option>
				<option value={100}>100g</option>
				<option value={150}>150g</option>
			</NativeSelect>
		</FormControl>
	);
    
    
}

export default SingleTea;