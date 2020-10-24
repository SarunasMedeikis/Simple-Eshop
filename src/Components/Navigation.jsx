import React from "react";
import Link from '@material-ui/core/Link';
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Box} from "@material-ui/core"

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Importing user context
import {UserContext} from "../Providers/UserProvider"

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
}));
  


const Navigation = (props) => {
	const user = React.useContext(UserContext);
    const classes = useStyles();
    const { history } = props;

    const handleMenuClick = (pageURL) => {
		history.push(pageURL);
    };

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
					<IconButton aria-label='search' color='inherit'>
						<PersonIcon
							onClick={() =>
								user
									? handleMenuClick("/profile")
									: handleMenuClick("/signin")
							}
						/>
					</IconButton>
					<IconButton aria-label='search' color='inherit'>
						<FavoriteIcon />
					</IconButton>
					<IconButton
						className={classes.menuNavLeft}
						aria-label='search'
						color='inherit'>
						<ShoppingCartIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
    
}


export default withRouter(Navigation);