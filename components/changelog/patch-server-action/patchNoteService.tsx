// patchNoteService.ts
import { db } from '../../../configs/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const patchNotesCollection = collection(db, 'patchNotes');

export interface PatchNote {
  id?: string;
  version: string;
  date: string;
  updateType: string,
  NewFeatures: [];
  bugFixes: string[];
  improvements: string[];
}

// Create
// export const createPatchNote = async (patchNote: PatchNote) => {
//   const docRef = await addDoc(patchNotesCollection, patchNote);
//   return docRef.id;
// };

export const createPatchNote = async (patchNote: PatchNote) => {
  // Generate random ID
  const randomId = generateRandomId();

  // Create a new PatchNote object with random ID
  const patchNoteWithId: PatchNote = {
    ...patchNote,
    id: randomId,
  };

  // Add the PatchNote to Firestore
  const docRef = await addDoc(patchNotesCollection, patchNoteWithId);

  return docRef.id;
};

// Read
export const fetchPatchNotes = async () => {
  const querySnapshot = await getDocs(patchNotesCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PatchNote));
};

// Update
export const updatePatchNote = async (id: string, patchNote: Partial<PatchNote>) => {
  const patchNoteDoc = doc(db, 'patchNotes', id);
  await updateDoc(patchNoteDoc, patchNote);
};

// Delete
export const deletePatchNote = async (id: string) => {
  const patchNoteDoc = doc(db, 'patchNotes', id);
  await deleteDoc(patchNoteDoc);
};

function generateRandomId(): string {
  const timestamp = Date.now().toString();
  const randomChars = Math.random().toString(36).substring(2, 8);
  return timestamp + randomChars;
}