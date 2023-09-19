import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"
import { editSelectedWorkspaceGroup } from '../../general_redux/Workspace/actions';

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields 
function ModalEditGroup(props) {
    const nameFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT'){
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 31 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 31 ? true : false) }
        }
        return {value: '', isValid: false};
    };
    const dispatch = useDispatch();
    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const groupUuid = props.uuid;
    const theGroup = allGroups.find(group => group.uuid === groupUuid);
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: theGroup.name, isValid: true });
    const {isValid: nameFieldIsValid} = nameFieldState;
    const [descriptionFieldState, setDescriptionFieldState] = useState(theGroup.description);
    const [codeFieldState, setCodeFieldState] = useState(theGroup.code);

    useEffect(()=>{
        setFormIsValid(nameFieldIsValid);
    }, [nameFieldIsValid])

    const nameFieldChangeHandler = (event) =>{
        dispatchNameField({type: 'USER_INPUT', val: event.target.value});
    };
    const validateNameFieldHandler = () => {
        dispatchNameField({ type: 'INPUT_BLUR'});
    };
    const handleDescriptionInput = (e) => {
        setDescriptionFieldState(e.target.value);
    };
    const handleCodeInput = (e) => {
        setCodeFieldState(e.target.value);
    };
    function closeThisModal() {
        props.editGroupModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerEditGroup = (event) => {
        event.preventDefault();
        let nameField = nameFieldState.value.trim();
        let descriptionField = event.target.editGroupDescription.value.trim();
        let codeField = event.target.editGroupCode.value.trim(); 
        if(!nameField ){
            return console.error("Name field required to edit a group.") //replace with proper error message
        }
        if(nameField.length < 1 || nameField.length > 30 ){
            return console.error("Name field invalid.") //replace with proper error message
        }
        if(descriptionField.length > 100){
            return console.error("Description field invalid.") //replace with proper error message
        }
        if(codeField.length > 10){
            return console.error("Code field invalid.") //replace with proper error message
        }

        dispatch(editSelectedWorkspaceGroup(groupUuid, nameField , descriptionField, codeField));
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerEditGroup}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                <h2>Edit Group</h2>
                <p><small>Workspace: {selectedWorkspace.name}</small></p> 
                <div className="Modal-InputContainer">
                    <label htmlFor="editGroupName">Name*:</label>
                    <input value={nameFieldState.value} id="editGroupName" name="editGroupName" type="text" minLength="1" maxLength="30"
                    className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`} 
                    onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="editGroupDescription">Description:</label>
                    <input id="editGroupDescription" name="editGroupDescription" value={descriptionFieldState} onChange={handleDescriptionInput} type="text" minLength="1" maxLength="100"/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="editGroupCode">Code:</label>
                    <input id="editGroupCode" name="editGroupCode" value={codeFieldState} onChange={handleCodeInput} type="text" minLength="1" maxLength="10"/>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal} disabled={!formIsValid}>Edit group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalEditGroup;
