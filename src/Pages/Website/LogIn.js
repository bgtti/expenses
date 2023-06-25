import { useState, useEffect, useReducer } from "react";
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

    const submitHandler = (event) => {
        event.preventDefault();
        // props.onLogin(enteredEmail, enteredPassword);
    }

    return (
        <div className={`Website-SignUp Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Log in</h2>
            <form className="Website-SignAndLogForm" onSubmit={submitHandler}>
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupEmail">Email:</label>
                    <input id="signupEmail" name="signupEmail" type="email" 
                        className={`${emailState.isValid === false ? 'Website-SignAndLog-invalidInput' : ''}`}
                        value={emailState.value} onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}/>
                </div>
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupPassword">Password:</label>
                    <input id="signupPassword" name="signupPassword" type="password" 
                        className={`${passwordState.isValid === false ? 'Website-SignAndLog-invalidInput' : ''}`}
                        value={passwordState.value} onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler} /> 
                </div>
                <button type="submit" className="Common-button-primary Website-SignAndLog-PrimaryBtn"
                    disabled={!formIsValid}>Log in</button>
            </form>
        </div>
    )
}
export default LogIn