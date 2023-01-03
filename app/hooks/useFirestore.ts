import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useState } from 'react';

const useFirestore = () => {
    const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const getCollection = async (collectionPath: string) => {

        setLoading(true)
        const collection = await firestore().collection(collectionPath).get();

        const newData = collection.docs.map((doc) => ({ ...doc.data() }));
        setData(newData)
        if (data) {
            setLoading(false)
        }
    }

    return { getCollection, data, isLoading }
}

export default useFirestore