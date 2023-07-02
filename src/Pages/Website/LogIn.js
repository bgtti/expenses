import { useState, useEffect, useReducer } from "react";
import {useSelector, useDispatch} from "react-redux"
import { signIn, signOut, logIn } from "../../general_redux/actions";

import "../../Assets/Styles/Website.css";
function LogIn(props) {
    const emailReducer = (state, action) => {
        if (action.type === 'USER_INPUT'){
            return { value: action.val, isValid: action.val.includes('@') }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: state.value.includes('@') }
        }
        return {value: '', isValid: false};
    };
    const passwordReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: action.val.trim().length > 6 }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: state.value.trim().length > 6 }
        }
        return { value: '', isValid: false };
    };

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailisValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordisValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("access_token");

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;
    useEffect(()=>{
        setFormIsValid(
            emailIsValid && passwordIsValid
        );
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) =>{
        // setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
        // setFormIsValid(
        //     passwordState.isValid && event.target.value.includes('@')
        // );
    };

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
        // setFormIsValid(
        //     event.target.value.trim().length > 6 && emailState.isValid
        // );
    };

    const validateEmailHandler = () => {
        // setEmailisValid(emailState.isValid);
        dispatchEmail({ type: 'INPUT_BLUR'});
    }

    const validatePasswordHandler = () => {
        // setPasswordisValid(enteredPassword.trim().length > 6);
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     // props.onLogin(enteredEmail, enteredPassword);
    // }

    const submitHandler = (event) => {
        event.preventDefault();
        //code bellow does not work because need to configure middleware.
        dispatch(logIn(emailState.value, passwordState.value));
        // const options = {
        //     method: 'POST',
        //     headers:{
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "email": emailState.value,
        //         "password": passwordState.value
        //     }),
        // };
        // fetch('http://127.0.0.1:5000/api/account/login', options)
        // .then(response =>{
        //     // if (response.status === 200) return response.json();
        //     // else console.error("Login error: response status not 200");
        //     if (response.ok) {
        //         return response.json(); // Return the Promise to be handled in the next then block
        //     } else {
        //         throw new Error('Login error: response status not 200');
        //     }
        // })
        // .then((data)=>{
        //     console.log(data);
        //     sessionStorage.setItem("access_token", data.access_token);
        // })
        // .catch(error=>{
        //     console.error("Login error.", error);
        // })
        
    }
    

    return (
        <div className={`Website-SignUp Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Log in</h2>
            {/* <button onClick={()=>dispatch(signIn())}>In </button> 
            <button onClick={() => dispatch(signOut())}>Out </button>  */}
            {/* <h2>Here: {isLoggedIn}</h2> */}
            {(token && token !=="" && token!==undefined) ? "You are already logged in." :
                (<form className="Website-SignAndLogForm" onSubmit={submitHandler}>
                    <div className="Website-SignAndLog-InputContainer">
                        <label htmlFor="loginEmail">Email:</label>
                        <input id="loginEmail" name="loginEmail" type="email" 
                            className={`${emailState.isValid === false ? 'Website-SignAndLog-invalidInput' : ''}`}
                            value={emailState.value} onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}/>
                    </div>
                    <div className="Website-SignAndLog-InputContainer">
                        <label htmlFor="loginPassword">Password:</label>
                        <input id="loginPassword" name="loginPassword" type="password" 
                            className={`${passwordState.isValid === false ? 'Website-SignAndLog-invalidInput' : ''}`}
                            value={passwordState.value} onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler} /> 
                    </div>
                    <button type="submit" className="Common-button-primary Website-SignAndLog-PrimaryBtn"
                        disabled={!formIsValid}>Log in</button>
                </form>)
            }
        </div>
    )
}
export default LogIn