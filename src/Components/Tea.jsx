import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { readProductsFromDb } from "./Firebase/firebase"

import SingleTea from "./SupportComponents/SingleTea";


const Tea = () => {
	const [teaData, setTeaData] = React.useState([]);
	React.useEffect(()=>{
		readProductsFromDb("Tea").then((res)=>{
			setTeaData(res);
			console.log("res", res);
		}).catch((e)=>{
			console.log("Error fetching data from database", e);
		})
	},[])

	return (
		<Grid container spacing={2}>
			{teaData.map((item) => {
				return (
					<Grid item xs={3}>
						<SingleTea key={item.id} item={item} />
					</Grid>
				);
			})}
		</Grid>
	);
	
	

};

export default Tea;
