import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2GqFk9r4I9AkEOUf7TwxcxaKeksASmpE",
    authDomain: "retro-mart-db.firebaseapp.com",
    projectId: "retro-mart-db",
    storageBucket: "retro-mart-db.appspot.com",
    messagingSenderId: "445409548413",
    appId: "1:445409548413:web:c6f5bcd37755213c303914"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//Google Document Auth
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
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