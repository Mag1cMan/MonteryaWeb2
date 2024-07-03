import { db } from '../../../configs/firebase';
import { doc, getDoc,updateDoc } from 'firebase/firestore';

export async function fetchUser(uid: string) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().usertype);
    return docSnap.data();
  } catch (error) {
    console.log("Error Fetching User Data");
  }
}

export async function setDisplayName(uid, DisplayName) {
  try {
    const userDoc = doc(db, 'users', uid); // Adjust the path to your users collection if needed
    console.log(userDoc);
    await updateDoc(userDoc, {
      displayName: DisplayName
    });
  
    // console.log('Display Name updated successfully');
    return JSON.stringify({ status: 200});

  } catch (error) {
    // console.error('Error updating display name:', error);
    return JSON.stringify({ status: 200, error: error.errorMessage });

  }
}
