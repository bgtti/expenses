import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../general_redux/SignAndLogIn/actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Website.css";;

function SignUp(props) {
    const userIsLoggedIn = useSelector((state) => state.isLoggedIn.loggedIn);
    const nameReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 0 };
        }
        if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 0 };
        }
        return { value: "", isValid: false };
    };

    const emailReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
        }
        if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
        }
        return { value: "", isValid: false };
    };

    const passwordReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 5 };
        }
        if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 5 };
        }
        return { value: "", isValid: false };
    };

    const repeatPasswordReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: (action.val.trim() === passwordState.value.trim() && action.val.trim().length > 5)};
        }
        if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: (state.value.trim() === passwordState.value.trim() && state.value.trim().length > 5)};
        }
        return { value: "", isValid: false };
    };

    const [formIsValid, setFormIsValid] = useState(false);
    const [nameState, dispatchName] = useReducer(nameReducer, {
        value: "",
        isValid: null,
    });
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });
    const [repeatPasswordState, dispatchRepeatPassword] = useReducer(repeatPasswordReducer, {
        value: "",
        isValid: null,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isValid: nameIsValid } = nameState;
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    const { isValid: repeatPasswordIsValid } = repeatPasswordState;

    useEffect(() => {
        if(passwordState.value.trim() === repeatPasswordState.value.trim()){
            setFormIsValid(nameIsValid && emailIsValid && passwordIsValid && repeatPasswordIsValid);
        } else {
            setFormIsValid(false)
        }
    }, [nameIsValid, emailIsValid, passwordIsValid, repeatPasswordIsValid, passwordState, repeatPasswordState]);

    const nameChangeHandler = (event) => {
        dispatchName({ type: "USER_INPUT", val: event.target.value });
    };

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    };

    const repeatPasswordChangeHandler = (event) => {
        dispatchRepeatPassword({ type: "USER_INPUT", val: event.target.value });
    };

    const validateNameHandler = () => {
        dispatchName({ type: "INPUT_BLUR" });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };

    const validateRepeatPasswordHandler = () => {
        dispatchRepeatPassword({ type: "INPUT_BLUR" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(
        signUp(nameState.value.trim(), emailState.value.trim(), passwordState.value.trim())
        ).then(() => {
            if(userIsLoggedIn){
                navigate("/dashboard");
            } else {
                console.error("There was a problem creating your account. Please try again later.")
            }
        }).catch((error) => {
            console.error("Signup error: there was a problem signing up. [SignUp.jsx]");
        });
    };

    return (
        <div className={`Website-SignUp Common-padding Common-expand-flex-1 ${props.className}`}>
        <h2>Sign up</h2>
        <form className="Website-SignAndLogForm" onSubmit={submitHandler}>
            <div className="Website-SignAndLog-InputContainer">
                <label htmlFor="signupName">Name:</label>
                <input
                    id="signupName"
                    name="signupName"
                    type="text"
                    value={nameState.value}
                    onChange={nameChangeHandler}
                    onBlur={validateNameHandler}
                    className={`${nameState.isValid === false ? "Website-SignAndLog-invalidInput" : ""}`}
                />
            </div>
            <div className="Website-SignAndLog-InputContainer">
                <label htmlFor="signupEmail">Email:</label>
                <input
                    id="signupEmail"
                    name="signupEmail"
                    type="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    className={`${emailState.isValid === false ? "Website-SignAndLog-invalidInput" : ""}`}
                />
            </div>
            <div className="Website-SignAndLog-InputContainer">
                <label htmlFor="signupPassword">Password:</label>
                <input
                    id="signupPassword"
                    name="signupPassword"
                    type="password"
                    minLength="6"
                    maxLength="60"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    className={`${passwordState.isValid === false ? "Website-SignAndLog-invalidInput" : ""}`}
                />
            </div>
            <div className="Website-SignAndLog-InputContainer">
                <label htmlFor="signupPasswordRepeat">Repeat Password:</label>
                <input
                    id="signupPasswordRepeat"
                    name="signupPasswordRepeat"
                    type="password"
                    minLength="6"
                    maxLength="60"
                    value={repeatPasswordState.value}
                    onChange={repeatPasswordChangeHandler}
                    onBlur={validateRepeatPasswordHandler}
                    className={`${repeatPasswordState.isValid === false ? "Website-SignAndLog-invalidInput" : ""}`}
                />
            </div>
            <button
            type="submit"
            className="Common-button-primary Website-SignAndLog-PrimaryBtn"
            disabled={!formIsValid}
            >
            Sign up
            </button>
        </form>
        </div>
    );
}

export default SignUp;