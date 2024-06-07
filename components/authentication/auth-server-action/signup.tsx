import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { db } from '../../../configs/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { addDoc, collection, doc, getDoc , serverTimestamp, setDoc} from "firebase/firestore";

// Fix these to handler error accordingly

export async function CheckDupes(data: { email: string; password: string; confirm: string }) {
  try {
    console.log('Sending POST request with email:', data.email);

    const json = { email: data.email };
    console.log(json);
    // const auth = getAuth();
    const response = await fetch('https://api.monterya.com/AuthTest/Web/Checkduplicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json) // body data type must match "Content-Type" header
    });

    console.log(response);
  } catch (error) {
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
    console.log(error.code);
    let errorMessage = error.code;

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

    console.error('Error signing up:', errorMessage, error);
    return JSON.stringify({ status: 500, error: errorMessage });
  }
}

export async function signInWithEmail(data: { email: string; password: string }) {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    // If sign-in is successful, you may return the user data or a success status
    return JSON.stringify({ status: 200, user: userCredential.user });
  } catch (error) {
    const errorCode = error.code;
    let errorMessage = errorCode;

    switch (errorMessage) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/invalid-password':
        errorMessage = 'Invalid email password.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email credential.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many Login attempts';
        break;
      default:
        errorMessage = 'An error occurred during sign-in.';
    }
    console.log(JSON.stringify({ error: errorMessage }));
    return JSON.stringify({ status: 500, error: errorMessage });
  }
}

// FIX THIS  WHY CAN"T I GET CURRETN SESSION !!
export async function readUserSession() {
  const auth = getAuth();

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in', user);
    } else {
      console.log('No user is signed in');
    }
  });
}

export async function AfterGoogleSignUp() {
  console.log('Trigger After goolg login');
  // Need to add user data from Email to here
  //addUserToDatabase();
}

async function setUserData(user) {
  try {
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, {
      email: user.email,
      userId: user.uid,
      username: null,
      displayName: null,
      emailVerified: false,
      timeCreated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error setting user data:', error);
    throw new Error('Failed to set user data');
  }
}

async function setUserBalance(user) {
  try {
    const colRefC = doc(db, 'userBalance', user.uid);
    await setDoc(colRefC, {
      userId: user.uid,
      balance: 0,
      gold: 0,
      silver: 0,
      subscription: false
    });
  } catch (error) {
    console.error('Error setting user balance:', error);
    throw new Error('Failed to set user balance');
  }
}
