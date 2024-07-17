import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from '@firebase/auth';
import { auth } from './firebase';
import LoadingScreen from '../components/LoadingScene/LoadingScreen';
import { fetchplayerInfo } from 'components/authentication/auth-server-action/authorsie';
import { signupWithOAuth } from 'components/authentication/auth-server-action/signup';
import { bigint } from 'zod';
//import { AfterGoogleSignUp } from "../auth-server-action/action";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentuser, setCurrentUser] = useState(null);
  const [authorise, setAuthorise] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGameOpen, setisGameOpen] = useState(false);

  const isAuthed = () =>
    new Promise((resolve, reject) => {
      globalAuthHandler = resolve;
    });


    const RegisterUser = async (data) => {
      try {
        await signupWithOAuth(data.user);
      } catch (error) {
        console.log(error.message);
      }
    };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      RegisterUser(data);
      console.log('login');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const SetGameState = async (param) => {
    setisGameOpen(param);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
   
    const SetPlayerInfo = async (currentUser) => {
      try {
        const setInfo = await fetchplayerInfo(currentUser.uid);
        // console.log(setInfo);
        setCurrentUser(setInfo);
      } catch (error) {
        console.log(error.message);
      }
    };
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        SetPlayerInfo(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        setisGameOpen(false);
        setAuthorise(false);
      }
    });

   

    return () => unsubscribe();
  }, [user]);
  return (
    <AuthContext.Provider
      value={{ user, currentuser, googleSignIn, logOut, SetGameState, isGameOpen, authorise }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
