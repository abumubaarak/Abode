import { appleAuth } from '@invertase/react-native-apple-authentication'
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
    .then(() => createUser("google"))
}

export async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  console.log(appleCredential, appleAuthRequestResponse)
  // Sign the user in with the credential
  const displayName = `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`
  console.log(displayName)
  return auth().signInWithCredential(appleCredential).then(() => createUser("apple", displayName));
}

export const createUser = (type: string, name: string = auth().currentUser.displayName) => {
  const document = firestore().collection(USERS).doc(auth().currentUser.uid)
  if (!document.id) {
    document.set({
      displayName: type === "google" ? auth().currentUser.displayName : name,
      email: auth().currentUser.email,
      uid: auth().currentUser.uid,
      userType: "tenant",
      profession: "",
      dob: new Date(),
      language: "",
      isVerify: false,
      gender: "",
    })
  }

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
export const REQUEST = "Request"
export const WISHLISTS = "Wishlists"
