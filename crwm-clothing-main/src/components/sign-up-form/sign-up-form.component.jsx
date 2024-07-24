import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields= {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;


     
    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password doesnt match")
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
  
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("email already in use")
            }
            console.error(error)
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an Account?</h2>
            <span>Sign up With your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type="text" onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label='Email' required type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="password" required type="password" onChange={handleChange} name="password" value={password}/>
                <FormInput label="confirmPassword" required type="password" onChange={handleChange}name="confirmPassword" value={confirmPassword}/>

                <Button  type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm