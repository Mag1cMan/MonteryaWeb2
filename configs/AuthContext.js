import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "@firebase/auth";
import { auth } from "./firebase";
import LoadingScreen from "../components/LoadingScene/LoadingScreen";
import { authoriseUser } from "components/authentication/auth-server-action/authorsie";
import { signupWithOAuth } from "components/authentication/auth-server-action/signup";
//import { AfterGoogleSignUp } from "../auth-server-action/action";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorise, setAuthorise] = useState(false);
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
                setisGameOpen(false);
                setAuthorise(false);
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

        const RegisterUser = async () =>{
            try{
                await signupWithOAuth(user);
            }
            catch(error){
                console.log(error.message);

            }

        }
        
        RegisterUser();
       
        const fetchAuthorisation = async () => {
            try {
              const isAuthorised = await authoriseUser(user.uid);
              setAuthorise(isAuthorised);
            } catch (error) {
              console.log(error.message);
            }
          };


        fetchAuthorisation();

        return () => unsubscribe();


        
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut , SetGameState ,isGameOpen , authorise}}>
            {loading ? <LoadingScreen /> : children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
