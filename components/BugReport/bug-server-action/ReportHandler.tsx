import { db , storage } from '../../../configs/firebase';
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {v4} from "uuid";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


interface BugReportData {
  userId: string;
  bugType: string;
  customBugType?: string; // Make customBugType optional
  bugName: string;
  bugDetails: string;
  bugImage?: File; // Use File type for bugImage
}

export async function SendBugReport(data: BugReportData): Promise<string> {
  try {
    // Check if user exists
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('User does not exist');
      return JSON.stringify({ status: 404, message: 'User not found' });
    }

    const BugID = uuidv4();

    const bugData: any = {
      userId: data.userId,
      bugType: data.bugType,
      bugName: data.bugName,
      bugDetails: data.bugDetails,
      timeCreated: serverTimestamp(),
      BugId: BugID,
      resolve: false,
      ...(data.customBugType && { customBugType: data.customBugType })
    };

    if (data.bugImage) {
      const imageRef = ref(storage, `BugReports/${data.bugImage.name + uuidv4()}`);
      const uploadResult = await uploadBytes(imageRef, data.bugImage);
      console.log("Image uploaded successfully");

      const url = await getDownloadURL(uploadResult.ref);
      bugData.bugImage = url;
    }

    // Save bugData to Firestore
    await setDoc(doc(collection(db, "bugReport")), bugData);
    console.log("Bug report saved successfully");

    return JSON.stringify({ status: 200 });
  } catch (error) {
    console.error('Error sending bug report:', error);
    return JSON.stringify({ status: 500, message: error.message });
  }
}
