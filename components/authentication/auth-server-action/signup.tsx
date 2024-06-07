import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { redirect } from "next/navigation";
import { db } from '../../../configs/firebase';
import { addDoc, collection, doc, getDoc , serverTimestamp, setDoc} from "firebase/firestore";


// Fix these to handler error accordingly

export async function CheckDupes(data: {
    email: string;
    password: string;
    confirm: string;
}) {
    try{
        console.log("Sending POST request with email:", data.email);


        const json = {email: data.email};
        console.log(json);
        const auth = getAuth();
        const response = await fetch("https://api.monterya.com/AuthTest/Web/Checkduplicate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json), // body data type must match "Content-Type" header
        });

        console.log(response);

    } 
    catch (error) {
        // Handle error here
        console.error('Error signing up:', error);
        return JSON.stringify({ status: error.message }); // Or handle the error message as you prefer
    }
}

export async function signUpWithEmail(data: {
    email: string;
    password: string;
    confirmPassword: string;
}) {
    const auth = getAuth();

    try {
        console.log('Signup data:', data);

        if (data.password !== data.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await setUserData(userCredential.user);
        await setUserBalance(userCredential.user);

        return JSON.stringify({ status: 200 });
    } catch (error) {
        let errorMessage = 'An unknown error occurred';

        if (error.code) {
            // Handle Firebase specific errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'The email address is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is not valid.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak.';
                    break;
                default:
                    errorMessage = error.message;
            }
        } else if (error.message) {
            // Handle custom errors
            errorMessage = error.message;
        }

        console.error('Error signing up:', errorMessage, error);
        return JSON.stringify({ status: 'error', message: errorMessage });
    }
}

export async function signInWithEmail(data: {
    email: string;
    password: string;
}){
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log(result);
        return JSON.stringify({status : 200});
    } catch (error) {
        // Handle error here
        console.error('Error signing In:', error);
        return JSON.stringify({ error: error.message }); // Or handle the error message as you prefer
    }
}

// FIX THIS  WHY CAN"T I GET CURRETN SESSION !!
export async function readUserSession(){
    const auth = getAuth();
    
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in", user);
        } else {
            console.log("No user is signed in");
        }
    });
}

export async function AfterGoogleSignUp() {
    console.log("Trigger After goolg login")
    addUserToDatabase();
}



async function setUserData(user:any) {
    try {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
            email: user.email,
            userId: user.uid,
            username: null,
            displayName: null,
            emailVerified: false,
            timeCreated: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error setting user data:', error);
        throw new Error('Failed to set user data');
    }
}

async function setUserBalance(user) {
    try {
        const colRefC = doc(db, "userBalance", user.uid);
        await setDoc(colRefC, {
            userId: user.uid,
            balance: 0,
            gold: 0,
            silver: 0,
            subscription: false,
        });
    } catch (error) {
        console.error('Error setting user balance:', error);
        throw new Error('Failed to set user balance');
    }
}





