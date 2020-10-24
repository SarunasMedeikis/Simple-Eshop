import  React, { useEffect }  from "react";
import {auth} from "../Components/Firebase/firebase"


export const UserContext = React.createContext(null);

const UserProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    //GET THE CURRENTLY SIGNED IN USER
    // so we can access it anywhere in the app via provider
    useEffect( ()=>{
        const authListener = auth.onAuthStateChanged(authUser => {
            authUser
                ?setUser(authUser)
                :setUser(null);

            setLoading(false);
        });
        return authListener;
    },[])
    

    return (
		<>
			{loading ? (
				<div>
				</div>
			) : (
				<UserContext.Provider value={user}>
					{props.children}
				</UserContext.Provider>
			)}
		</>
	);
}

export default UserProvider;