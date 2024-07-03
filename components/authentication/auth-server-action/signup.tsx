import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../../../configs/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

// import { addDoc, collection, doc, getDoc , serverTimestamp, setDoc} from "firebase/firestore";
// import { v6ToV1 } from 'uuid';


function generateHashCode(playerID) {
  const hash = crypto.createHash('sha256');
  hash.update(playerID);
  return BigInt('0x' + hash.digest('hex').substring(0, 16)); // Convert the first 16 characters of the hash to a BigInt
}

function getCurrentTicks() {
  const epochTicks = BigInt('621355968000000000'); // Ticks at Unix epoch (1970-01-01T00:00:00Z)
  const ticksPerMillisecond = BigInt('10000');
  const currentTicks = epochTicks + (BigInt(Date.now()) * ticksPerMillisecond);
  return currentTicks;
}

async function genUserId(playerID) {
  const id = generateHashCode(playerID);
  const suffix = getCurrentTicks() % BigInt('10000000000'); // Ensure suffix is within 10 digits
  const userId = id + suffix;
  const userIdStr = userId.toString(); // Convert to string
  return userIdStr.substring(userIdStr.length - 10); // Ensure exactly 10 characters
}


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

interface OAuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  providerId: string;
}

export async function signupWithOAuth(user: OAuthUser) {
  try {
    const userId = await genUserId(user.displayName);
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return;
    } else {
      await setUserData(userId , user.email ,user.uid);
      await setUserBalance(userId , user.uid);
    }
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
}

export async function signUpWithEmail(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const auth = getAuth();

  try {
    // console.log('Signup data:', data);

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const newUserId = await genUserId(data.email);
    console.log(typeof newUserId);
    console.log(newUserId);
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await setUserData(newUserId , data.email , credential.user.uid);
    await setUserBalance(newUserId , credential.user.uid);
    
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

export async function AfterGoogleSignUp() {
  console.log('Trigger After goolg login');
  // Need to add user data from Email to here
  //addUserToDatabase();
}

async function setUserData(user :string , email : string , headerID : string) {
  try {
    const docRef = doc(db, 'users', headerID);
    await setDoc(docRef, {
      email: email,
      userId: user,
      username: null,
      displayName: null,
      emailVerified: false,
      timeCreated: serverTimestamp(),
      usertype: 'player'
    });
  } catch (error) {
    console.error('Error setting user data:', error);
    throw new Error('Failed to set user data');
  }
}

async function setUserBalance(newuserid : string , headerID : string) {
  try {
    const colRefC = doc(db, 'userBalance', headerID);
    await setDoc(colRefC, {
      userId: newuserid,
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

