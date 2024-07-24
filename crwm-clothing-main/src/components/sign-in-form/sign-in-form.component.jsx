import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
const defaultFormFields= {
    email:'',
    password:'',
}

const SignInForm = () =>{
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const signInWithGoogle = async ()=> {
     dispatch(googleSignInStart());
    }
 
    const resetFormFields= () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email,password))
            resetFormFields()
        }catch(error){

            switch(error.code){
                case 'auth/wrong-password': alert("Please enter right password"); break;
                case 'auth/user-not-found':alert("User not found"); break;
                default: console.log(error);
            }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an Account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="password" required type="password" onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button  type="submit">Sign In</Button>
                    <Button type="button" buttonType={'google'} onClick={signInWithGoogle} >Google Sign In</Button>
        
                </div>
            </form>
        </div>
    )
}

export default SignInForm