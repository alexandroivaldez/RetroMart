import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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