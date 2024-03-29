import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editWorkspace } from "../../../general_redux/UserSettingsWorkspaces/actions";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import currency_list from "../../../Data/currencyList";
import "../../../Assets/Styles/Modal.css"
import "../User.css"

//modal being used in UserSettings and WorkspaceSettings

function ModalEditWorkspace(props) {
    const dispatch = useDispatch();
    const nameFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 51 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 51 ? true : false) }
        }
        if (action.type === 'CLEAR') {
            return { value: '', isValid: null }
        }
        return { value: '', isValid: false };
    };
    const abbrevFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 1 && action.val.length < 3 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 1 && state.value.length < 3 ? true : false) }
        }
        if (action.type === 'CLEAR') {
            return { value: '', isValid: null }
        }
        return { value: '', isValid: false };
    };
    const currencyFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.length > 1 && action.val.length < 4 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.length > 1 && state.value.length < 50 ? true : false) }
        }
        if (action.type === 'CLEAR') {
            return { value: '', isValid: null }
        }
        return { value: '', isValid: false };
    };

    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const allWorkspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const workspaceUuid = props.uuid; //PROPS
    const theWorkspace = allWorkspaces.find(workspace => workspace.uuid === workspaceUuid);
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: theWorkspace.name, isValid: true });
    const [abbrevFieldState, dispatchAbbrevField] = useReducer(abbrevFieldReducer, { value: theWorkspace.abbreviation, isValid: true });
    const [currencyFieldState, dispatchCurrencyField] = useReducer(currencyFieldReducer, { value: theWorkspace.currency, isValid: true });
    const { isValid: nameFieldIsValid } = nameFieldState;
    const { isValid: abbrevFieldIsValid } = abbrevFieldState;
    const { isValid: currencyFieldIsValid } = currencyFieldState;

    useEffect(() => {
        setFormIsValid(
            nameFieldIsValid && abbrevFieldIsValid && currencyFieldIsValid
        );
    }, [nameFieldIsValid, abbrevFieldIsValid, currencyFieldIsValid])

    const nameFieldChangeHandler = (event) => {
        dispatchNameField({ type: 'USER_INPUT', val: event.target.value });
    };
    const abbrevFieldChangeHandler = (event) => {
        dispatchAbbrevField({ type: 'USER_INPUT', val: event.target.value });
    };
    const currencyFieldChangeHandler = (event) => {
        dispatchCurrencyField({ type: 'USER_INPUT', val: event.target.value });
    };

    const validateNameFieldHandler = () => {
        dispatchNameField({ type: 'INPUT_BLUR' });
    }
    const validateAbbrevFieldHandler = () => {
        dispatchAbbrevField({ type: 'INPUT_BLUR' });
    };
    const validateCurrencyFieldHandler = () => {
        dispatchCurrencyField({ type: 'INPUT_BLUR' });
    };

    // const clearAllFields = () => {
    //     dispatchNameField({ type: 'CLEAR'});
    //     dispatchAbbrevField({ type: 'CLEAR' });
    //     dispatchCurrencyField({ type: 'CLEAR' });
    // }

    function closeThisModal() {
        props.editWorkspaceModalToggler("close");
        // setTimeout(()=>{
        //     clearAllFields(); 
        // }, 150);
    }

    const formSubmitHandlerEditWorkspace = (event) => {
        event.preventDefault();
        dispatch(editWorkspace(nameFieldState.value, abbrevFieldState.value, currencyFieldState.value, workspaceUuid))
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerEditWorkspace}>
                <div className="Modal-Heading">
                    <h2>Edit Workspace</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceName">Name*:</label>
                    <input value={nameFieldState.value} id="workspaceName" name="workspaceName" type="text" minLength="1" maxLength="50"
                        className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
                        onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceAbbreviation">2-letter abbreviation*:</label>
                    <input value={abbrevFieldState.value} id="workspaceAbbreviation" name="workspaceAbbreviation" type="text" maxLength="2" minLength="2"
                        className={`${abbrevFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
                        onChange={abbrevFieldChangeHandler} onBlur={validateAbbrevFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceCurrency">Currency*:</label>
                    <select name="workspaceCurrency" id="workspaceCurrency" onChange={currencyFieldChangeHandler}
                        className={`${currencyFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
                        onBlur={validateCurrencyFieldHandler} value={currencyFieldState.value} >
                        <option key={-1} value="">(select an option)</option>
                        {currency_list.map((currency, index) => (
                            <option key={index} value={currency.code}>{currency.code} ({currency.name})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" disabled={!formIsValid}>Save Workspace</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalEditWorkspace;

