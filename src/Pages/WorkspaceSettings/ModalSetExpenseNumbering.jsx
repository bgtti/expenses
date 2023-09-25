import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addSelectedExpenseNumberingPreference } from '../../general_redux/Workspace/actions';
import { ExpenseNumberingFormat } from "../../constants/enums";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields 
function ModalSetExpenseNumbering(props) {
    const checkedFieldReducer = (state, action) => {
        if (action.type === 'USER_INPUT'){
            let validFormatAction = Object.values(ExpenseNumberingFormat).includes(action.val)
            return { value: action.val, isValid: (action.val && validFormatAction ? true : false) }
        }
        if (action.type === 'INPUT_BLUR') {
            let validFormatState = Object.values(ExpenseNumberingFormat).includes(state.value)
            return { value: state.value, isValid: (state.value && validFormatState ? true : false) }
        }
        return {value: '', isValid: false};
    };
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const checkBoxOptions = Object.values(ExpenseNumberingFormat);
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const theFormat = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseNumberingFormat);
    const [checkedFieldFieldState, dispatchCheckedFieldState] = useReducer(checkedFieldReducer, { value: theFormat, isValid: true });
    const [formIsValid, setFormIsValid] = useState(false);
    const {isValid: checkedFieldIsValid} = checkedFieldFieldState;

    useEffect(()=>{
        setFormIsValid(checkedFieldIsValid);
    }, [checkedFieldIsValid])

    const checkedFieldChangeHandler = (event) =>{
        dispatchCheckedFieldState({type: 'USER_INPUT', val: event.target.value});
        dispatchCheckedFieldState({ type: 'INPUT_BLUR'});
    };
    // const validateCheckFieldHandler = () => {
    //     dispatchCheckedFieldState({ type: 'INPUT_BLUR'});
    // };
    const determineIfCheckedHandler = (event) => {
        // event.target.value === checkedFieldFieldState.value ? return true : return false;
        if (event.target.value === checkedFieldFieldState.value){
            return true;
        } else {
            return false;
        }
    }

    function closeThisModal() {
        props.expenseNumberingModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerSetExpenseNumbering = (event) => {
        event.preventDefault();
        if (checkBoxOptions.includes(checkedFieldFieldState.value)){
            dispatch(addSelectedExpenseNumberingPreference(selectedWorkspace.Uuid, checkedFieldFieldState.value));
        } else {
            dispatchCheckedFieldState({ type: 'INPUT_BLUR'});
        }
    };
    
    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerSetExpenseNumbering}>
                <div className="Modal-Heading">
                    <h2>Set Expense Numbering Format</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                    </div>
                </div>
                {
                    checkBoxOptions.map((option, index) => (
                        <div className="WorkspaceSettings-checkboxContainer" key={index}>
                            <input type="checkbox" id={option} name={option} value={option} 
                            checked={determineIfCheckedHandler} onChange={checkedFieldChangeHandler}/>
                            <label htmlFor={option}>{option}</label><br/>
                        </div>
                    ))
                }
                {/* <div className="WorkspaceSettings-checkboxContainer">
                    <input type="checkbox" id="option1" name="option1" value="option1" checked/>
                    <label htmlFor="option1">YY-MM-number</label><br />
                </div>
                <div className="WorkspaceSettings-checkboxContainer">
                    <input type="checkbox" id="option2" name="option2" value="option2" />
                    <label htmlFor="option2">Number</label><br />
                </div> */}
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal} disabled={!formIsValid}>Select format</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalSetExpenseNumbering;
