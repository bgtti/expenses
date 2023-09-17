import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
//import "../../Styles/ModalAddExpense.css"
import "../../Assets/Styles/Modal.css"
import { addSelectedWorkspaceGroup } from '../../general_redux/Workspace/actions';

function ModalAddGroup(props) {
    const nameFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT'){
            return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 31 ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 31 ? true : false) }
        }
        if (action.type === 'CLEAR') {
            return {value: '', isValid: null}
        }
        return {value: '', isValid: false};
    };
    const dispatch = useDispatch();
    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    //const workspaceUuid = useSelector((state) => state.selectedWorkspace.selectedWorkspace.uuid);
    const [formIsValid, setFormIsValid] = useState(false);
    const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: null, isValid: true });
    const {isValid: nameFieldIsValid} = nameFieldState;
    useEffect(()=>{
        setFormIsValid(nameFieldIsValid);
    }, [nameFieldIsValid])

    const nameFieldChangeHandler = (event) =>{
        dispatchNameField({type: 'USER_INPUT', val: event.target.value});
    };
    const validateNameFieldHandler = () => {
        dispatchNameField({ type: 'INPUT_BLUR'});
    }
    const clearAllFields = () => {
        dispatchNameField({ type: 'CLEAR'});
    }
    function closeThisModal() {
        props.addGroupModalToggler("close"); ///PROPS
        setTimeout(()=>{
            clearAllFields(); 
        }, 150);
    }
    const formSubmitHandlerAddGroup = (event) => {
        event.preventDefault();
        let nameField = nameFieldState.value.trim();
        let descriptionField = event.target.addGroupDescription.value.trim();
        let codeField = event.target.addGroupCode.value.trim(); 
        if(!nameField ){
            return console.error("Name field required to add a group.") //replace with proper error message
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

        dispatch(addSelectedWorkspaceGroup(selectedWorkspace.uuid, nameField , descriptionField, codeField));
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerAddGroup}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                <h2>Add Group</h2>
                <p><small>Workspace: {selectedWorkspace.name}</small></p> 
                <div className="Modal-InputContainer">
                    <label htmlFor="addGroupName">Name*:</label>
                    <input value={nameFieldState.value} id="addGroupName" name="addGroupName" type="text" minLength="1" maxLength="30"
                    className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`} 
                    onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="addGroupDescription">Description:</label>
                    <input id="addGroupDescription" name="addGroupDescription" type="text" minLength="1" maxLength="100"/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="addGroupCode">Code:</label>
                    <input id="addGroupCode" name="addGroupCode" type="text" minLength="1" maxLength="10"/>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal} disabled={!formIsValid}>Add group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddGroup;
