import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSelectedWorkspaceAccount } from '../../../general_redux/Workspace/actions';
import { toast } from 'react-toastify';
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields
function ModalEditAccount(props) {
    const nameFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 31 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 31 ? true : false) }
        }
        return { value: '', isValid: false };
    };
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const accountUuid = props.uuid;
    const theAccount = allAccounts.find(account => account.uuid === accountUuid);
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: theAccount.name, isValid: true });
    const { isValid: nameFieldIsValid } = nameFieldState;
    const [descriptionFieldState, setDescriptionFieldState] = useState(theAccount.description);
    const [codeFieldState, setCodeFieldState] = useState(theAccount.code);

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
    function closeThisModal() {
        props.editAccountModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerEditAccount = (event) => {
        event.preventDefault();
        let nameField = nameFieldState.value.trim();
        let descriptionField = event.target.editAccountDescription.value.trim();
        let codeField = event.target.editAccountCode.value.trim();
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
        dispatch(editSelectedWorkspaceAccount(accountUuid, nameField, descriptionField, codeField));
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerEditAccount}>
                <div className="Modal-Heading">
                    <h2>Edit Account</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <div className="Modal-InputContainer">
                    <label htmlFor="editAccountName">Name*:</label>
                    <input value={nameFieldState.value} id="editAccountName" name="editAccountName" type="text" minLength="1" maxLength="30"
                        className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
                        onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="editAccountDescription">Description:</label>
                    <input id="editAccountDescription" name="editAccountDescription" value={descriptionFieldState} onChange={handleDescriptionInput} type="text" minLength="1" maxLength="100" />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="editAccountCode">Code:</label>
                    <input id="editAccountCode" name="editAccountCode" value={codeFieldState} onChange={handleCodeInput} type="text" minLength="1" maxLength="10" />
                </div>
                <button type="submit" className="Modal-PrimaryBtn" disabled={!formIsValid}>Edit account</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalEditAccount;