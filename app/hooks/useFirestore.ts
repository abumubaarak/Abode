import auth from "@react-native-firebase/auth"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { WhereFilterOp } from "firebase/firestore"
import { useState } from "react"
import { wait } from "../utils"
import { PROPERTY, REQUEST, WISHLISTS } from "../utils/firebase"
type RentRequestI = {
  lid: string
  uid: string
  pId: string
}
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
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }

  const queryWishlist = async () => {
    setLoading(true)
    const userWishList = await firestore()
      .collection(WISHLISTS)
      .where("uid", "==", auth().currentUser.uid)
      .get()

    const userWishListArr = userWishList.docs.map((doc) => ({ ...doc.data() }))

    const query = await firestore().collection(PROPERTY).get()

    const listings = query.docs.map((doc) => ({ ...doc.data() }))

    const wishlist = userWishListArr.map((doc) =>
      listings.filter((item) => item.id === doc.propertyId),
    )

    const wishlistArr = []
    wishlist.map((doc) => wishlistArr.push(...doc))
    setData(wishlistArr)

    if (data) {
      setLoading(false)
    }
  }

  const applyRent = async (request: RentRequestI) => {
    setLoading(true)
    const requestCollection = await firestore().collection(REQUEST).doc()
    requestCollection.set({
      ...request,
      id: requestCollection.id,
    })
    if (requestCollection.id) {
      wait(4000).then(() => {
        setDocument(requestCollection)
        setLoading(false)
      })
    }
  }
  return {
    applyRent,
    getCollection,
    data,
    isLoading,
    document,
    getDocument,
    queryDocument,
    queryWishlist,
  }
}

export default useFirestore
