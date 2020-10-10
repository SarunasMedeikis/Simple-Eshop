import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
} from "react-router-dom";


const Product = () =>{
let { id } = useParams();
return <div>Now showing post {id}</div>;

}

export default Product;

 