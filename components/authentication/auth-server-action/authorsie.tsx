import { db } from '../../../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function authoriseUser (useId : string){
    try {
        const docRef = doc(db, "users", useId);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data().usertype);
        if(docSnap.data().usertype === "admin"){
            return true;
        }
        else{
            return false;
        }
        
    } catch (error) {
        console.log(error.message);
    }

}