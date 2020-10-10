import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
// Icons
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
	sectionFooterRoot: {
		height: "200px",
		position: "relative",
		backgroundColor: "#eeeeee",
	
	},
	SectionFooterGaps: {
		marginLeft: "6rem",
	},
	socialMediaIcons: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "-12px",
	},
	firstColumnFooter: {
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(4),
	},
	secondColumnFooter: {
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(4),
	},
	itemSpacing: {
		marginBottom: theme.spacing(1),
	},
	gutterFromBottom: {
		marginTop: theme.spacing(3),
	},
}));


const Footer = (props) => {
    const classes = useStyles();
    const { history } = props;
     const handleMenuClick = (pageURL) => {
			history.push(pageURL);
		};
    
    return (
			<Grid
				container
				className={`${classes.sectionFooterRoot} ${classes.gutterFromBottom}`}>
				<Grid item xs={3}>
					<Box
						className={`${classes.SectionFooterGaps} ${classes.firstColumnFooter}`}>
						<Typography variant='h6'>TeaStore</Typography>
						<Typography variant='subtitle1'>
							+447 413 100 004
						</Typography>
						<Box className={classes.socialMediaIcons}>
							<IconButton
								aria-label='search'
								color='inherit'>
								<InstagramIcon />
							</IconButton>
							<IconButton
								aria-label='search'
								color='inherit'>
								<TwitterIcon />
							</IconButton>
							<IconButton
								aria-label='search'
								color='inherit'>
								<FacebookIcon />
							</IconButton>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xs={1}
					className={classes.secondColumnFooter}>
					<Link
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/")}
						className={classes.itemSpacing}>
						Home
					</Link>
					<Link
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/tea")}
						className={classes.itemSpacing}>
						Tea
					</Link>
					<Link
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/coffe")}
						className={classes.itemSpacing}>
						Coffee
					</Link>
					<Link
						variant='button'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/about")}
						className={classes.itemSpacing}>
						About
					</Link>
				</Grid>

				<Grid
					item
					xs={1}
					className={classes.secondColumnFooter}>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/corporate")
						}
						className={classes.itemSpacing}>
						Corporate
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/contacts")
						}
						className={classes.itemSpacing}>
						Contacts
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() => handleMenuClick("/data/shops")}
						className={classes.itemSpacing}>
						Shops
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/Articles")
						}
						className={classes.itemSpacing}>
						Articles
					</Link>
				</Grid>

				<Grid
					item
					xs={2}
					className={classes.secondColumnFooter}>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/serviceaggrement")
						}
						className={classes.itemSpacing}>
						Service Agreement
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/personaldata")
						}
						className={classes.itemSpacing}>
						Personal Data
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/returnpolicy")
						}
						className={classes.itemSpacing}>
						Return Policy
					</Link>
					<Link
						variant='subtitle1'
						underline='hover'
						color='inherit'
						onClick={() =>
							handleMenuClick("/data/termsofuse")
						}
						className={classes.itemSpacing}>
						Terms of Use
					</Link>
				</Grid>
			</Grid>
	);
}


export default withRouter(Footer);