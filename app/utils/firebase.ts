import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useStores } from '../models';
import { UserInfo } from '../types';


export async function onGoogleButtonPress(userType: String) {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then(() => createUser(userType));
}


export const createUser = (userType: String) => {
    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
            displayName: auth().currentUser.displayName,
            email: auth().currentUser.email,
            uid: auth().currentUser.uid,
            userType: userType
        })
}