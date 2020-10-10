import app from "firebase/app"
import "firebase/auth";

const config = {
	// Configs here
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
	}

	// AUTH

	doCreateUserWithEmailAndPassword = (email, password) => 
	this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) => {
		this.auth.signInWithEmailAndPassword(email, password);
	}

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	dosPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}
export default Firebase;