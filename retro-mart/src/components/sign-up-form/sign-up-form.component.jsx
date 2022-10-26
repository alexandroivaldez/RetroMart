import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

import "./sign-up-form.styles.scss";

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
        <div className="sing-up-container">
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Dislpay Name"
                    inputOptions = {{
                        type: 'text',
                        required: true,
                        onChange: handleChange,
                        name: 'displayName',
                        value: displayName
                    }}
                    />
                    
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;