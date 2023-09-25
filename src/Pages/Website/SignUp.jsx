import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../general_redux/SignAndLogIn/actions";
import { useNavigate } from "react-router-dom";
import "./Website.css";;

function SignUp(props) {
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
        return { value: action.val, isValid: action.val.trim().length > 6 };
        }
        if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isValid: nameIsValid } = nameState;
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        setFormIsValid(nameIsValid && emailIsValid && passwordIsValid);
    }, [nameIsValid, emailIsValid, passwordIsValid]);

    const nameChangeHandler = (event) => {
        dispatchName({ type: "USER_INPUT", val: event.target.value });
    };

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
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

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(
        signUp(nameState.value, emailState.value, passwordState.value)
        ).then(() => {
        navigate("/dashboard");
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
                minlength="6"
                maxlength="60"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                className={`${passwordState.isValid === false ? "Website-SignAndLog-invalidInput" : ""}`}
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