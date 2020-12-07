import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const { REACT_APP_API_KEY } = process.env;
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DB_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER,
	appId: process.env.REACT_APP_APP_ID,
};
console.log("API KEY", REACT_APP_API_KEY);
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const addUserDataToDb = async (tempUser) => {
	await db
		.collection("users")
		.doc(auth.currentUser.uid)
		.set(tempUser)
		.then(() => {
			console.log("Succesfully set user data to databse");
		})
		.catch((error) => {
			console.error(
				"Issue submitting data to the server" + error,
			);
		});
};

//To read user data
export const readData = async (userId) => {
	let userRef = db.collection("users").doc(userId);

	try {
		const doc = await userRef.get();
		if (doc.exists) {
			return doc.data();
		}
	} catch (e) {
		console.error("Error receiving user data", e);
	}
};

//To read user orders
export const readUserOrders = async (userId) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("orders");
	let tempDataArray = [];
	await userRef
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				tempDataArray.push(doc.data());
			});
		})
		.catch((e) => {
			console.log("ERROR GETTING ORDERS", e);
		});

	return tempDataArray;
};

//Update order information to Received
export const updateOrderInfo = async (userId, orderNumber) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("orders");
	await userRef
		.where("orderNumber", "==", orderNumber)
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let specificOrderRef = userRef.doc(doc.id);
				return specificOrderRef
					.update({
						orderReceived: true,
						orderStatus: "Delivered",
					})
					.then(() => {
						console.log("Order Succesfully updated!");
					})
					.catch((e) => {
						console.log("Error updating document", e);
					});
			});
		})
		.catch((e) => {
			console.log("ERROR GETTING ORDER ID", e);
		});
};

// Add address to firebase DB
export const addAddressToDb = async (tempAddress) => {
	await db
		.collection("users")
		.doc(auth.currentUser.uid)
		.collection("deliveryAddresses")
		.doc()
		.set(tempAddress)
		.then(() => {
			console.log("Address added succesfully");
		})
		.catch((e) => {
			console.error("Error writing address to db : ", e);
		});
};

//To read user Addresses
export const readUserAddress = async (userId) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("deliveryAddresses");
	let tempDataArray = [];
	await userRef
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let tempObject = doc.data();
				tempObject = { ...tempObject, id: doc.id };
				tempDataArray.push(tempObject);
			});
		})
		.catch((e) => {
			console.log("ERROR GETTING ADDRESSES", e);
		});

	return tempDataArray;
};

// Update address information
export const updateAddressInformation = async (
	userId,
	addressId,
	tempAddress,
) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("deliveryAddresses")
		.doc(addressId);
	await userRef
		.update({
			addressLine1: tempAddress.addressLine1,
			addressLine2: tempAddress.addressLine2,
			phone: tempAddress.phone,
			country: tempAddress.country,
			firstName: tempAddress.firstName,
			lastName: tempAddress.lastName,
			postCode: tempAddress.postCode,
		})
		.then(() => {
			console.log("Address Succesfully updated!");
		})
		.catch((e) => {
			console.log("Error updating document", e);
		});
};

// Add new Payment card to DB
export const addNewPaymentCardToDB = async (userId, cardData) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("paymentCards")
		.doc();
	userRef
		.set(cardData)
		.then(console.log("Card added succesfully"))
		.catch((e) => {
			console.log("Error adding card", e);
		});
};

//To read user Addresses
export const readUserCards = async (userId) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("paymentCards");
	let tempDataArray = [];
	await userRef
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let tempObject = doc.data();
				tempObject = { ...tempObject, id: doc.id };
				tempDataArray.push(tempObject);
			});
		})
		.catch((e) => {
			console.log("ERROR GETTING PAYMENT CARDS", e);
		});

	return tempDataArray;
};

// Product read

export const readProductsFromDb = async (category) => {
	let productRef = db.collection("products");
	let tempDataArray = [];
	await productRef
		.where("category", "array-contains", category)
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let tempObject = doc.data();
				tempObject = { ...tempObject, id: doc.id };
				tempDataArray.push(tempObject);
			});
		})
		.catch((e) => {
			console.log("error getting products", e);
		});

	return tempDataArray;
};

// Add to cart
export const addToCart = async (userId, item) => {
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("cart")
		.doc();
	await userRef
		.set({id:item.id, price:item.price})
		.then((res)=>{

		})
		.catch((e) => {
			console.log("Error adding card", e);
		});
};


// Read all cart items
export const getCartDocuments =  async(userId) => {
	let productRef = db.collection("products");
	let dataArray = [];
	let userRef = db
		.collection("users")
		.doc(userId)
		.collection("cart")
	 await userRef
		.get()
		.then((snapshot)=>{
			snapshot.docs.map((doc)=> (
				 productRef.doc(doc.data().id).get()
					.then((doc) => {
						let tempData = {
							title: doc.data().title,
							photo:doc.data().photo,
							productId: doc.id,
							price: doc.data().price,
						}
						dataArray.push(tempData)
					})
			));
		}).catch((e)=>{
			console.log("ERROR GETTING CART DOCS ", e);
		})

		return dataArray;
};


export default firebase;

