import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCWeXpiwmI6MUaM-mHsEnNrEmH23ibTnTM",
  authDomain: "abode-41d86.firebaseapp.com",
  projectId: "abode-41d86",
  storageBucket: "abode-41d86.appspot.com",
  messagingSenderId: "980427352092",
  appId: "1:980427352092:web:fc9d3fbcedbc88ca83d7d9",
})

export const firestoreQuery = getFirestore(firebaseConfig)

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => createUser())
}

export const createUser = () => {
  firestore().collection(USERS).doc(auth().currentUser.uid).set({
    displayName: auth().currentUser.displayName,
    email: auth().currentUser.email,
    uid: auth().currentUser.uid,
    userType: "tenant",
  })
}

export const addWishlist = (propertyId: string) => {
  const wishlistDocument = firestore().collection(WISHLISTS).doc()
  wishlistDocument.set({
    id: wishlistDocument.id,
    propertyId,
    uid: auth().currentUser.uid,
  })
}
export const removeWishlist = (docID: string) => {
  firestore().collection(WISHLISTS).doc(docID).delete()
}

export const PROPERTY = "Property"
export const USERS = "Users"
export const WISHLISTS = "Wishlists"
