import useSWR from 'swr';
import { collection, getDocs } from 'firebase/firestore';
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

    // let dates: Date[] = res.map(item => new Date(item.date));
    res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
