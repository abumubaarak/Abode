import auth from "@react-native-firebase/auth"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { WhereFilterOp } from "firebase/firestore"
import { useState } from "react"

const useFirestore = () => {
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([])
  const [document, setDocument] = useState<FirebaseFirestoreTypes.DocumentData>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const getCollection = async (collectionPath: string) => {
    setLoading(true)
    const collection = await firestore().collection(collectionPath).get()

    const newData = collection.docs.map((doc) => ({ ...doc.data() }))
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }
  const getDocument = async (collectionPath: string, docPath: string) => {
    setLoading(true)
    const collection = await firestore().collection(collectionPath).doc(docPath).get()
    setDocument(collection.data())
    console.log(collection.data())
    if (collection) {
      setLoading(false)
    }
  }
  const queryDocument = async (
    collectionPath: string,
    query: string,
    opStr: WhereFilterOp,
    value: string,
  ) => {
    setLoading(true)
    const collection = await firestore()
      .collection(collectionPath)
      .where(query, opStr, value)
      .where("uid", "==", auth().currentUser.uid)
      .get()
    const newData = collection.docs.map((doc) => ({ ...doc.data() }))
    console.log(newData)
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }

  return { getCollection, data, isLoading, document, getDocument, queryDocument }
}

export default useFirestore
