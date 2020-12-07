import React from "react";
import {
	useParams,
} from "react-router-dom";


const Product = () =>{
let { id } = useParams();
return <div>Now showing post {id}</div>;

}

export default Product;

 