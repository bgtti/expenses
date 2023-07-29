import { useState, useEffect, useReducer } from "react";
import {useSelector, useDispatch} from "react-redux"
import { logIn } from "../../general_redux/SignAndLogIn/actions";
import { useNavigate } from "react-router-dom";
import "./Website.css";

function LogIn(props) {
    //used for form validation
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

    const [formIsValid, setFormIsValid] = useState(false);
    const [hasTriedToLogIn, setHasTriedToLogIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        if (isLoggedIn.token && isLoggedIn.token !== undefined && isLoggedIn.token !== "") {
            setErrorMessage("");
            setHasTriedToLogIn(false);
            navigate("/dashboard");
        } else if (hasTriedToLogIn && !isLoggedIn.loggedIn){
            //to avoid running this script before an api response, setTimeout was used - not the best solution.
            setTimeout(()=>{
                if (hasTriedToLogIn && !isLoggedIn.loggedIn){
                    setErrorMessage("Email or Password incorrect, please try again");
                    navigate("/login");
                }
            }, 350)
        }
    }, [hasTriedToLogIn, isLoggedIn, navigate]);

    useEffect(()=>{
        setFormIsValid(
            emailIsValid && passwordIsValid
        );
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) =>{
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR'});
    }

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(logIn(emailState.value, passwordState.value))
        setHasTriedToLogIn(true);
    };

    return (
        <div className={`Website-SignUp Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Log in</h2>
            {
            (isLoggedIn.token && isLoggedIn.token !=="" && isLoggedIn.token!==undefined) ? `You are already logged in.` :
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
                    {errorMessage && (
                        <p className="Website-SignAndLog-errorMessage">{errorMessage}</p>
                    )}
                    <button type="submit" className="Common-button-primary Website-SignAndLog-PrimaryBtn"
                        disabled={!formIsValid}>Log in</button>
                </form>)
            }
        </div>
    )
}
export default LogIn