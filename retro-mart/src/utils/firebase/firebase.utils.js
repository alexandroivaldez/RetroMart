//Creates an Firebase app instance
import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



/*
    Your web app's Firebase configuration
    Your API keys do not need to be hidden.
    Firebase actually needs these public.
*/

const firebaseConfig = {
    apiKey: "AIzaSyB2GqFk9r4I9AkEOUf7TwxcxaKeksASmpE",
    authDomain: "retro-mart-db.firebaseapp.com",
    projectId: "retro-mart-db",
    storageBucket: "retro-mart-db.appspot.com",
    messagingSenderId: "445409548413",
    appId: "1:445409548413:web:c6f5bcd37755213c303914"
};
  
// Initialize Firebase app instance
const firebaseApp = initializeApp(firebaseConfig);

//Set up a Google provider instance
const provider = new GoogleAuthProvider();

//Force users to use a Google account because of Google Auth
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//Creates document in "users" collection with provided auth
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {

    //Check if userAuth is valid
    if(!userAuth) return;

    /*
    Returns the document reference aka the actual document from the 'users' collection
    in db that matches the userAuth.id
    */
    const userDocRef = doc(db, 'users', userAuth.uid);

    //Gets a special object from the document reference
    const userSnapshot = await getDoc(userDocRef);

    //Check to see if the user does no exist in the 'users' collection
    //If it doesn't create it.
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //Create document inside of "users" collection
        try {
            //setDoc(document, {data})
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("errot creating the user: ", error.message);
        }
    }

    return userDocRef;
}


//Creates an authenticated user using email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    //If email or password dne return nothing.
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}