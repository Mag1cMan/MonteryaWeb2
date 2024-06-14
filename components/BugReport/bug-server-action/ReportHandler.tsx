import { db } from '../../../configs/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

interface BugReportData {
  userId: string;
  bugType: string;
  customBugType?: string; // Make customBugType optional
  bugName: string;
  bugDetails: string;
}

export async function SendBugReport(data: BugReportData): Promise<string> {
  console.log(data);

  try {
    const BugID = generateId(12);

    const bugData = {
      userId: data.userId,
      bugType: data.bugType,
      bugName: data.bugName,
      bugDetails: data.bugDetails,
      timeCreated: serverTimestamp(),
      BugId: BugID,
      resolve: false,
      ...(data.customBugType && { customBugType: data.customBugType })
    };

    await setDoc(doc(collection(db, "bugReport")), bugData);
    return JSON.stringify({ status: 200 });
  } catch (error) {
    console.error('Error sending bug report:', error);
    return JSON.stringify({ status: 500 });
  }
}

function dec2hex(dec: number): string {
  return dec.toString(16).padStart(2, "0");
}

// generateId :: Integer -> String
function generateId(len: number): string {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
