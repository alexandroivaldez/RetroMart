import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

//Default values for the form
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    //State hook and destructuring of state.
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    //Resets the form fields back to nothing.
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


    //Function creates user when the proper values are submitted.
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();

        } catch(error) {
            if(error.code == "auth/email-already-in-use") {
                alert('Email already in use!');
            }
            console.log("User creation encountered an error", error);
        }

        console.log("Form submitted!");
    }

    //Updates the formFields state when the user types any change
    const handleChange = (event) => {
        const { name, value } = event.target;
        //Update the specific value
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1> Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;