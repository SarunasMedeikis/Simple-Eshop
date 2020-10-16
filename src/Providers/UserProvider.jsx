import  React, { useEffect }  from "react";
import {auth} from "../Components/Firebase/firebase"


export const UserContext = React.createContext({user:null});

const UserProvider = (props) => {
    const [user, setUser] = React.useState(null);

    //GET THE CURRENTLY SIGNED IN USER
    // so we can access it anywhere in the app via provider
    auth.onAuthStateChanged(user => {
        setUser(user);


    })

    return(
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;