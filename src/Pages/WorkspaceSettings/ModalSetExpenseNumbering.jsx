import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
// import { addSelectedExpenseNumberingPreference } from '../../general_redux/Workspace/actions';
import { ExpenseNumberingFormat } from "../../constants/enums";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

const ALLOWEDNUMDIGITS = ["3", "4", "5"]; 
const ALLOWEDEXPENSENUMTYPES =  ["YMN", "YN", "N"]; 
const ALLOWEDYEARDIGITS = ["2", "4"]; 
const ALLOWEDNUMSEPARATOR = ["hyphen", "slash", "none"]; 

const MAX_PREFIX_LENGTH = "10";
const MAX_START_NUMBER_LENGTH = "12";

const ACTIONS = {
    SELECTED: 'selected',
    UNSELECTED: 'unselected',
    USER_INPUT: 'userInput',
    INPUT_BLUR: 'inputBlur'
}
function prefixReducer(state, action){
    switch (action.type){
        case ACTIONS.SELECTED:
            return {selected: true, value:state.value, isValid: null};
        case ACTIONS.UNSELECTED:
            return {selected: false, value: "", isValid: true};
        case ACTIONS.USER_INPUT:
            return {selected: state.selected, value: action.val, isValid: (action.val.trim().length > 0 && action.val.trim().length < parseInt(MAX_PREFIX_LENGTH) + 1)};
        case ACTIONS.INPUT_BLUR:
            if (state.selected){
                return {selected: state.selected, value: state.value.trim(), isValid: (state.value.trim().length > 0 && state.value.trim().length < parseInt(MAX_START_NUMBER_LENGTH) + 1)};
            } else {
                return {selected: state.selected, value: "", isValid: true};
            }
        default:
            return state;
    }
}
function startNumReducer(state, action){
    switch (action.type){
        case ACTIONS.SELECTED:
            return {selected: true, value:state.value, isValid: null};
        case ACTIONS.UNSELECTED:
            return {selected: false, value: 1, isValid: true};
        case ACTIONS.USER_INPUT:
            return {selected: state.selected, value: action.val, isValid: (action.val.trim().length > 0 && action.val.trim().length < parseInt(MAX_PREFIX_LENGTH) + 1)};
        case ACTIONS.INPUT_BLUR:
            const maxValue = "9".repeat(parseInt(MAX_PREFIX_LENGTH))
            let userInput = parseInt(state.value)
            if (state.selected){
                return {selected: state.selected, value: state.value, isValid: (!isNaN(userInput) && userInput > 0 && userInput < parseInt(maxValue) + 1)};
            } else {
                return {selected: state.selected, value: "", isValid: true};
            }
        default:
            return state;
    }
}

function ModalSetExpenseNumbering(props) {

    //TODO:
    // validate form
    // display "current format" - top of modal
    // style the form
    // then fix backend to allow for info to be properly saved
    // adapt this form to get info from redux
    // check old code and delete what necessary: possibly enums too

    //Check the bellow:
    const styleClasses = props.className;
    const checkBoxOptions = Object.values(ExpenseNumberingFormat);
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const theFormat = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseNumberingFormat);
    // const [checkedFieldFieldState, dispatchCheckedFieldState] = useReducer(checkedFieldReducer, { value: theFormat, isValid: true });

    //new code:
    const [numDigitsSelected, setNumDigitsSelected] = useState('4');
    const [expenseNumberTypeSelected, setExpenseNumberTypeSelected] = useState('YMN');
    const [yearDigitsSelected, setYearDigitsSelected] = useState('4');
    const [numberSeparatorSelected, setNumberSeparatorSelected] = useState('hyphen');
    const [prefixState, dispatchPrefix] = useReducer(prefixReducer, {
        selected: false,
        value: "",
        isValid: true,
    })
    const [startNumState, dispatchStartNum] = useReducer(startNumReducer, {
        selected: false,
        value: 1,
        isValid: true,
    })

    const handleNumDigitsSelected = event => {
        setNumDigitsSelected(event.target.value);
    }
    const handleExpenseNumberTypeSelected = event => {
        setExpenseNumberTypeSelected(event.target.value);
    }
    const handleYearDigitsSelected = event => {
        setYearDigitsSelected(event.target.value);
    }
    const handleNumberSeparatorSelected = event => {
        setNumberSeparatorSelected(event.target.value);
    }
        function prefixSelectionHandler(event){
        if (event.target.checked){
            dispatchPrefix({type: ACTIONS.SELECTED})
        } else {
            dispatchPrefix({type: ACTIONS.UNSELECTED})
        }
    }
    function prefixChangeHandler(event){
        dispatchPrefix({type: ACTIONS.USER_INPUT, val: event.target.value})
    }
    function prefixValidationHandler(){
        dispatchPrefix({type: ACTIONS.INPUT_BLUR})
    }
    function startNumberSelectionHandler(event){
        if (event.target.checked){
            dispatchStartNum({type: ACTIONS.SELECTED})
        } else {
            dispatchStartNum({type: ACTIONS.UNSELECTED})
        }
    }
    function startNumChangeHandler(event){
        dispatchStartNum({type: ACTIONS.USER_INPUT, val: event.target.value})
    }
    function startNumValidationHandler(){
        dispatchStartNum({type: ACTIONS.INPUT_BLUR})
    }

    function closeThisModal() {
        props.expenseNumberingModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerSetExpenseNumbering = (event) => {
        event.preventDefault();
        // if (checkBoxOptions.includes(checkedFieldFieldState.value)){
        //     dispatch(addSelectedExpenseNumberingPreference(selectedWorkspace.Uuid, checkedFieldFieldState.value));
        // } else {
        //     dispatchCheckedFieldState({ type: 'INPUT_BLUR'});
        // }
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
                <div>
                    <p><b>Current format: 2023-01-0001.</b></p>
                </div>
                <div>
                    <p>How many digits should the expense number have?</p>
                    <input type="radio" id="3digits" name="numOfDigits" value="3" checked={numDigitsSelected === '3'} onChange={handleNumDigitsSelected}/>
                    <label htmlFor="3digits">3 digits. Example: 001.</label><br></br>
                    <input type="radio" id="4digits" name="numOfDigits" value="4" checked={numDigitsSelected === '4'}onChange={handleNumDigitsSelected}/>
                    <label htmlFor="4digits">4 digits. Example: 0001.</label><br></br>
                    <input type="radio" id="5digits" name="numOfDigits" value="5" checked={numDigitsSelected === '5'} onChange={handleNumDigitsSelected}/>
                    <label htmlFor="5digits">5 digits. Example: 00001.</label><br></br>
                </div>
                <div>
                    <p>Choose the preferred way you would like your invoices to be numbered:</p>
                    <input type="radio" id="YMN" name="expenseNumberType" value="YMN" checked={expenseNumberTypeSelected === 'YMN'} onChange={handleExpenseNumberTypeSelected}/>
                    <label htmlFor="YMN">include year and month in expense number. Example: 202312001.</label><br></br>
                    <input type="radio" id="YN" name="expenseNumberType" value="YN" checked={expenseNumberTypeSelected === 'YN'} onChange={handleExpenseNumberTypeSelected}/>
                    <label htmlFor="YN">include year in expense number. Example: 2023001.</label><br></br>
                    <input type="radio" id="N" name="expenseNumberType" value="N" checked={expenseNumberTypeSelected === 'N'} onChange={handleExpenseNumberTypeSelected}/>
                    <label htmlFor="N">use number only. Example: 001.</label><br></br>
                </div>
                <div>
                    <p>Choose number of year digits:</p>
                    <input type="radio" id="y2" name="yearDigits" value="2" checked={yearDigitsSelected === '2'} onChange={handleYearDigitsSelected}/>
                    <label htmlFor="y2">2-digits. Example: 23001 or 2301001.</label><br/>
                    <input type="radio" id="y4" name="yearDigits" value="4" checked={yearDigitsSelected === '2'} onChange={handleYearDigitsSelected}/>
                    <label htmlFor="y4">4-digits. Example: 2023001 or 202301001.</label><br/>
                </div>
                <div>
                    <p>Would you like to use a number separator?</p>
                    <input type="radio" id="hyphen" name="numberSeparator" value="hyphen" checked={numberSeparatorSelected === 'hyphen'} onChange={handleNumberSeparatorSelected}/>
                    <label htmlFor="hyphen">Separate using hyphen. Example: 2023-001 or 2023-01-001.</label><br/>
                    <input type="radio" id="slash" name="numberSeparator" value="slash" checked={numberSeparatorSelected === 'slash'} onChange={handleNumberSeparatorSelected}/>
                    <label htmlFor="slash">Separate using slash. Example: 2023/001 or 2023/01/001.</label><br/>
                    <input type="radio" id="noSeparator" name="numberSeparator" value="none" checked={numberSeparatorSelected === 'none'}  onChange={handleNumberSeparatorSelected}/>
                    <label htmlFor="noSeparator">No separator. Example: 2023001 or 202301001.</label><br/>
                </div>
                <div>
                    <input type="checkbox" id="includePrefix" name="includePrefix" value="includePrefix"  checked={prefixState.selected} onChange={prefixSelectionHandler}/>
                    <label htmlFor="includePrefix"> Include custom prefix</label><br/>
                    { prefixState.selected && (
                        <div>
                            <label htmlFor="prefix">Prefix number with:</label>
                            <input type="text" id="prefix" name="prefix" minLength="1" maxLength={MAX_PREFIX_LENGTH} onChange={prefixChangeHandler} onBlur={prefixValidationHandler} value={prefixState.value} className={`${prefixState.isValid === false ? "Modal-InputField-invalid" : ""}`}/>
                        </div>
                    )}
                    
                </div>
                <div>
                    <input type="checkbox" id="includeCustomNumber" name="includeCustomNumber" value="includeCustomNumber" checked={startNumState.selected} onChange={startNumberSelectionHandler}/>
                    <label htmlFor="includeCustomNumber">Custom start number</label><br/>
                    {startNumState.selected && (
                        <div>
                            <label htmlFor="customNumber">Start numbering from:</label>
                            <input type="number" id="customNumber" name="customNumber" minLength="1" maxLength={MAX_START_NUMBER_LENGTH} min="1" max={"9".repeat(parseInt(MAX_START_NUMBER_LENGTH))} onChange={startNumChangeHandler} onBlur={startNumValidationHandler} value={startNumState.value} className={`${startNumState.isValid === false ? "Modal-InputField-invalid" : ""}`}/>
                        </div>
                    )}
                    
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Select format</button>
                {/* include in button: disabled={!formIsValid} */}
            </form>
        </ModalWrapper>
    )
}

export default ModalSetExpenseNumbering;
