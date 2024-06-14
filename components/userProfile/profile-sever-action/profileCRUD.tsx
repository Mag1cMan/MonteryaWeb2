import { db } from '../../../configs/firebase';
import { doc, getDoc,updateDoc } from 'firebase/firestore';

export async function fetchUser(uid: string) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().usertype);
    return docSnap.data();
  } catch (error) {
    console.log("Somn error");
  }
}

export async function setDisplayName(uid, DisplayName) {
  try {
    const userDoc = doc(db, 'users', uid); // Adjust the path to your users collection if needed
    console.log(userDoc);
    await updateDoc(userDoc, {
      displayName: DisplayName
    });
  
    console.log('Display Name updated successfully');
  } catch (error) {
    console.error('Error updating display name:', error);
  }
}
