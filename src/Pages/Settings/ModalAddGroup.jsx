import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
//import "../../Styles/ModalAddExpense.css"
import "../../Assets/Styles/Modal.css"

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
    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const workspaceUuid = props.uuid; /// PROPS
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
        // dispatch(editWorkspace(nameFieldState.value, abbrevFieldState.value, currencyFieldState.value, workspaceUuid))
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerAddGroup}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                <h2>Add Group</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="addGroupName">Name*:</label>
                    <input value={nameFieldState.value} id="addGroupName" name="addGroupName" type="text" minLength="1" maxLength="30"
                    className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`} 
                    onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal} disabled={!formIsValid}>Add group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddGroup;
