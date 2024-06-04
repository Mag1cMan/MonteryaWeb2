import useSWR from 'swr';
import { GITHUB_API_URL, GITHUB_USERNAME, GITHUB_REPO } from 'data/constants';

const API_URL = `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/pulls?state=all`;
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';


const patchNotesCollectionRef = collection(db, 'patchNotes');

const getData = async () => {
  try {
    const querySnapshot = await getDocs(patchNotesCollectionRef);

    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPRsData = () => {
  const { data, error } = useSWR('patchNotes', getData); // Pass 'patchNotes' as the key to useSWR
  return {
    prData: data,
    isLoading: !error && !data,
    isError: error
  };
};
