const { createContext, useState } = require("react");
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, isLoading] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null);
            setError("");
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const registerUser = (email, name, password) => {
        ////
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
           return updateProfile(auth.currentUser, {
                displayName: name,
            });
        })
        .then((res) => console.log(res))
        .catch((err => setError(false)))
        .finally(() => setLoading(false))
    }

    const signInUser = (email, password) => {
        ////
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((err => setError(false)))
        .finally(() => setLoading(false))
    }

    const logoutUser = () => {
        ///
        signOut(auth);
    }

    const forgotPassword = (email) => {
        /////
        return sendPasswordResetEmail(auth, email);
    }

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword
    };

    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
}