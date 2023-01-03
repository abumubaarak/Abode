import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// src/firebase.js
import { getApp, initializeApp } from 'firebase/app';
import { FirestoreSettings, getFirestore } from 'firebase/firestore';


const firebaseConfig = initializeApp(
  {
    apiKey: "AIzaSyCWeXpiwmI6MUaM-mHsEnNrEmH23ibTnTM",
    authDomain: "abode-41d86.firebaseapp.com",
    projectId: "abode-41d86",
    storageBucket: "abode-41d86.appspot.com",
    messagingSenderId: "980427352092",
    appId: "1:980427352092:web:fc9d3fbcedbc88ca83d7d9"
  });

const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean } = {
  useFetchStreams: false, /* this might not be doing anything*/
  experimentalAutoDetectLongPolling: true /* This line fixed my issue*/
};
const app = getApp();  // Gets current app
//export const firestoreQuery = initializeFirestore(app, firestoreSettings) // not using getFirestore();

export const firestoreQuery = getFirestore(firebaseConfig);

export async function onGoogleButtonPress(userType: string) {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => createUser(userType))
}

export const createUser = (userType: string) => {
  firestore().collection("Users").doc(auth().currentUser.uid).set({
    displayName: auth().currentUser.displayName,
    email: auth().currentUser.email,
    uid: auth().currentUser.uid,
    userType,
  })
}


