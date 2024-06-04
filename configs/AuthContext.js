import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "@firebase/auth";
import { auth } from "./firebase";
import LoadingScreen from "../components/LoadingScene/LoadingScreen";
//import { AfterGoogleSignUp } from "../auth-server-action/action";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGameOpen , setisGameOpen] = useState(false);

    const isAuthed = () =>
        new Promise((resolve, reject) => {
            globalAuthHandler = resolve;
        });

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            //await AfterGoogleSignUp();
            console.log("login")
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const SetGameState = async(param) =>{
        setisGameOpen(param); 
    }

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }

            // //console.log("Curetn user" , currentUser);
            // if(currentUser != null){
            //   setUser(currentUser);
            //   setLoading(false);
            //   console.log("Trigger in function");

            // }
            // if(currentUser == null){
            //   setUser(null);
            //   setLoading(false);
            // }
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut , SetGameState ,isGameOpen }}>
            {loading ? <LoadingScreen /> : children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
