import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedWorkspaceAccount } from '../../../general_redux/Workspace/actions';
import { toast } from 'react-toastify';
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields
function ModalAddAccount(props) {
    const nameFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 31 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 31 ? true : false) }
        }
        if (action.type === 'CLEAR') {
            return { value: '', isValid: null }
        }
        return { value: '', isValid: false };
    };
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: "", isValid: true });
    const { isValid: nameFieldIsValid } = nameFieldState;
    const [descriptionFieldState, setDescriptionFieldState] = useState("");
    const [codeFieldState, setCodeFieldState] = useState("");

    useEffect(() => {
        setFormIsValid(nameFieldIsValid);
    }, [nameFieldIsValid])

    const nameFieldChangeHandler = (event) => {
        dispatchNameField({ type: 'USER_INPUT', val: event.target.value });
    };
    const validateNameFieldHandler = () => {
        dispatchNameField({ type: 'INPUT_BLUR' });
    };
    const handleDescriptionInput = (e) => {
        setDescriptionFieldState(e.target.value);
    };
    const handleCodeInput = (e) => {
        setCodeFieldState(e.target.value);
    };
    const clearAllFields = () => {
        dispatchNameField({ type: 'CLEAR' });
        setDescriptionFieldState("");
        setCodeFieldState("");
    };
    function closeThisModal() {
        props.addAccountModalToggler("close"); ///PROPS
        setTimeout(() => {
            clearAllFields();
        }, 150);
    };
    const formSubmitHandlerAddAccount = (event) => {
        event.preventDefault();
        let nameField = nameFieldState.value.trim();
        let descriptionField = event.target.addAccountDescription.value.trim();
        let codeField = event.target.addAccountCode.value.trim();
        if (!nameField) {
            return toast.error(`Error: name is a required field.`);
        }
        if (nameField.length < 1 || nameField.length > 30) {
            return toast.error(`Error: name invalid. Name should have between 1 and 30 characters.`);
        }
        if (descriptionField.length > 100) {
            return toast.error(`Error: description field invalid. Description should have up to 100 characters.`);
        }
        if (codeField.length > 10) {
            return toast.error(`Error: code invalid. Code should have up to 10 characters.`);
        }

        dispatch(addSelectedWorkspaceAccount(selectedWorkspace.uuid, nameField, descriptionField, codeField));
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerAddAccount}>
                <div className="Modal-Heading">
                    <h2>Add Account</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <div className="Modal-InputContainer">
                    <label htmlFor="addAccountName">Name*:</label>
                    <input value={nameFieldState.value} id="addAccountName" name="addAccountName" type="text" minLength="1" maxLength="30"
                        className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
                        onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="addAccountDescription">Description:</label>
                    <input id="addAccountDescription" name="addAccountDescription" value={descriptionFieldState} onChange={handleDescriptionInput} type="text" minLength="1" maxLength="100" />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="addAccountCode">Code:</label>
                    <input id="addAccountCode" name="addAccountCode" value={codeFieldState} onChange={handleCodeInput} type="text" minLength="1" maxLength="10" />
                </div>
                <button type="submit" className="Modal-PrimaryBtn" disabled={!formIsValid}>Add account</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddAccount;
