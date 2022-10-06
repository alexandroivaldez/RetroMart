import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        //Get user auth from Google
        const {user} = await signInWithGooglePopup();

        //Create document in "users" collection with the provided user auth
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1>Sign In Page</h1>;
            <button onClick={logGoogleUser}> Sign In with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;