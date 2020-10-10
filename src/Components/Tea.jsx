import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SingleTea from "./SupportComponents/SingleTea";


const TeaDB = [
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
	{
		_id: "ABC123FIRSTTEAENTRY",
		title: "Matcha",
		desc: "Green tea powder used for cooking from Japan",
		rating: ["5"],
		reviews: [
			{
				username: "Reviewer 1",
				body:
					"Great tea, super fast delivery, would order again!",
			},
		],
		photo:
			"https://d29fhpw069ctt2.cloudfront.net/photo/74842/preview/bamboo_preview_9560.jpeg",
		price: "5.36",
		quantityAvailable: "50",
		category: ["Green tea", "Japanese"],
	},
];


const Tea = () => {
	return (
		<Grid container spacing={2}>
			{TeaDB.map((item) => {
				return (
					<Grid item xs={3}>
						<SingleTea key={item._id} item={item} />
					</Grid>
				);
			})}
		</Grid>
	);
	
	

};

export default Tea;
