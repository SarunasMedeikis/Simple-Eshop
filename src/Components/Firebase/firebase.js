import firebase from  "firebase/app"
import "firebase/auth";
import "firebase/firestore";

const config = {
 DATA HERE
};


firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
const db = firebase.firestore();
export const addUserDataToDb = async (email, username) => {
	await db.collection("users").doc().set(email,username).then(()=>{
		console.log("Succesfully set user data to databse");
	})
	.catch(error => {
		console.error("Issue submitting data to the server" + error);
	})
}

export default firebase;