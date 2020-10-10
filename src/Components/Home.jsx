import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	sectionOneGridItem: {
		height: "300px",
		position: "relative",
	},
	sectionOneBox: {
		height: "100%",
		width: "80%",
		backgroundColor: theme.palette.secondary.light,
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: "-1",
	},
	sectionOneText: {
		width: "500px",
		marginTop: 0,
		height: "inherit",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginLeft: theme.spacing(4),
		alignItems: "baseline",
	},
	sectionTwoText: {
		width: "300px",
	},
	gutterFromSection: {
		marginBottom: theme.spacing(3),
	},
	sectionTwoBoxOne: {
		height: "100%",
		width: "99%",
		backgroundColor: theme.palette.secondary.light,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: "-1",
	},
	sectionTwoBoxTwo: {
		height: "100%",
		width: "99%",
		backgroundColor: "#ff99bb",
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: "-1",
	},
}));

const Home = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={1}>
			{/* SECTION ONE */}
			<Grid
				item
				xs={12}
				className={`${classes.sectionOneGridItem} ${classes.gutterFromSection}`}>
				<Box className={classes.sectionOneText}>
					<Typography variant='h3'>
						We deliver the freshest possible tea from
						around the world
					</Typography>
					<Button variant='contained' color='secondary'>
						See tea selections
					</Button>
				</Box>

				<Box className={classes.sectionOneBox}></Box>
			</Grid>

			{/* SECTION TWO */}
			<Grid item xs={8} className={classes.sectionOneGridItem}>
				<Box
					className={`${classes.sectionOneText} ${classes.sectionTwoText}`}>
					<Typography variant='h6'>Tea</Typography>
					<Typography variant='p'>
						We fresh pick the tea directly from our
						suppliers, every single batch is tested, and
						grown naturally in rural areas around China
						and Japan.
					</Typography>
				</Box>

				<Box className={classes.sectionTwoBoxOne}></Box>
			</Grid>
			<Grid
				item
				xs={4}
				className={`${classes.sectionOneGridItem} ${classes.gutterFromSection}`}>
				<Box
					className={`${classes.sectionOneText} ${classes.sectionTwoText}`}>
					<Typography variant='h6'>Coffee</Typography>
					<Typography variant='p'>
						Our new coffe beans are grown at the best
						natural plantations. Located in Brazil, check
						out our newest collections here!
					</Typography>
				</Box>
				<Box className={classes.sectionTwoBoxTwo}></Box>
			</Grid>
		</Grid>
	);
};

export default Home;
