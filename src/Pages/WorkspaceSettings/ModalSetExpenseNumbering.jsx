import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedExpenseNumberingPreference } from '../../general_redux/Workspace/actions';
import { toast } from 'react-toastify';
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

const ALLOWEDNUMDIGITS = ["3", "4", "5"];
const ALLOWEDEXPENSENUMTYPES = ["YMN", "YN", "N"];
const ALLOWEDYEARDIGITS = ["2", "4"];
const ALLOWEDNUMSEPARATOR = ["-", "/", ""];

const MAX_PREFIX_LENGTH = "10";
const MAX_START_NUMBER_LENGTH = "12";
const THIS_YEAR = (new Date().getFullYear()).toString();
const THIS_MONTH = (new Date().getMonth() + 1).toString();

const ACTIONS = {
    SELECTED: 'selected',
    UNSELECTED: 'unselected',
    USER_INPUT: 'userInput',
    INPUT_BLUR: 'inputBlur'
}

function prefixReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECTED:
            return { selected: true, value: state.value, isValid: null };
        case ACTIONS.UNSELECTED:
            return { selected: false, value: "", isValid: true };
        case ACTIONS.USER_INPUT:
            return { selected: state.selected, value: action.val, isValid: (action.val.trim().length > 0 && action.val.trim().length < parseInt(MAX_PREFIX_LENGTH) + 1) };
        case ACTIONS.INPUT_BLUR:
            if (state.selected) {
                return { selected: state.selected, value: state.value.trim(), isValid: (state.value.trim().length > 0 && state.value.trim().length < parseInt(MAX_START_NUMBER_LENGTH) + 1) };
            } else {
                return { selected: state.selected, value: "", isValid: true };
            }
        default:
            return state;
    }
}
function startNumReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECTED:
            return { selected: true, value: state.value, isValid: null };
        case ACTIONS.UNSELECTED:
            return { selected: false, value: 1, isValid: true };
        case ACTIONS.USER_INPUT:
            return { selected: state.selected, value: action.val, isValid: (action.val.trim().length > 0 && action.val.trim().length < parseInt(MAX_PREFIX_LENGTH) + 1) };
        case ACTIONS.INPUT_BLUR:
            const maxValue = "9".repeat(parseInt(MAX_PREFIX_LENGTH))
            let userInput = parseInt(state.value)
            if (state.selected) {
                return { selected: state.selected, value: state.value, isValid: (!isNaN(userInput) && userInput > 0 && userInput < parseInt(maxValue) + 1) };
            } else {
                return { selected: state.selected, value: "", isValid: true };
            }
        default:
            return state;
    }
}

function ModalSetExpenseNumbering(props) {

    const dispatch = useDispatch();
    const styleClasses = props.className;
    const theWS = useSelector((state) => state.selectedWorkspace);
    const selectedWorkspace = theWS.selectedWorkspace;
    const [numDigitsSelected, setNumDigitsSelected] = useState(theWS.selectedWorkspaceExpenseNumberingFormat.number_digits.toString());
    const [expenseNumberTypeSelected, setExpenseNumberTypeSelected] = useState(theWS.selectedWorkspaceExpenseNumberingFormat.number_format);
    const [yearDigitsSelected, setYearDigitsSelected] = useState(theWS.selectedWorkspaceExpenseNumberingFormat.number_year_digits.toString());
    const [numberSeparatorSelected, setNumberSeparatorSelected] = useState(theWS.selectedWorkspaceExpenseNumberingFormat.number_separator);
    const [prefixState, dispatchPrefix] = useReducer(prefixReducer, {
        selected: false,
        value: theWS.selectedWorkspaceExpenseNumberingFormat.number_custom_prefix,
        isValid: true,
    })
    const [startNumState, dispatchStartNum] = useReducer(startNumReducer, {
        selected: false,
        value: theWS.selectedWorkspaceExpenseNumberingFormat.number_start,
        isValid: true,
    })
    const [currentFormatState, setCurrentFormat] = useState('2023-01-0001');
    const [formIsValid, setFormIsValid] = useState(true);
    const { isValid: prefixStateIsValid } = prefixState;
    const { isValid: startNumStateIsValid } = startNumState;

    useEffect(() => {
        setFormIsValid(prefixStateIsValid && startNumStateIsValid);
    }, [prefixStateIsValid, startNumStateIsValid])

    useEffect(() => {
        let currPrefix = (prefixState.selected ? prefixState.value : null);
        let currYear;
        if (expenseNumberTypeSelected === "YMN" || expenseNumberTypeSelected === "YN") {
            currYear = (yearDigitsSelected === "4" ? THIS_YEAR : THIS_YEAR.slice(-2))
        } else {
            currYear = null;
        }
        let currMonth = (expenseNumberTypeSelected === "YMN" ? THIS_MONTH : null)
        let currSeparator = numberSeparatorSelected;
        let currNum;
        if (startNumState.selected) {
            let selectedValue = startNumState.value.toString();
            if (startNumState.value !== "1") {
                if (selectedValue.length >= parseInt(numDigitsSelected)) {
                    currNum = startNumState.value
                } else {
                    let numZeroes = parseInt(numDigitsSelected) - selectedValue.length
                    currNum = `${"0".repeat(numZeroes)}${selectedValue}`;
                }
            }
        } else {
            currNum = `${"0".repeat(parseInt(numDigitsSelected) - 1)}1`;
        }
        let currentFormat = `${currPrefix ? currPrefix + currSeparator : ""}${currYear ? currYear + currSeparator : ""}${currMonth ? currMonth + currSeparator : ""}${currNum}`
        setCurrentFormat(currentFormat);
    }, [numDigitsSelected, yearDigitsSelected, expenseNumberTypeSelected, numberSeparatorSelected, prefixState, startNumState])

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
    function prefixSelectionHandler(event) {
        if (event.target.checked) {
            dispatchPrefix({ type: ACTIONS.SELECTED })
        } else {
            dispatchPrefix({ type: ACTIONS.UNSELECTED })
        }
    }
    function prefixChangeHandler(event) {
        dispatchPrefix({ type: ACTIONS.USER_INPUT, val: event.target.value })
    }
    function prefixValidationHandler() {
        dispatchPrefix({ type: ACTIONS.INPUT_BLUR })
    }
    function startNumberSelectionHandler(event) {
        if (event.target.checked) {
            dispatchStartNum({ type: ACTIONS.SELECTED })
        } else {
            dispatchStartNum({ type: ACTIONS.UNSELECTED })
        }
    }
    function startNumChangeHandler(event) {
        dispatchStartNum({ type: ACTIONS.USER_INPUT, val: event.target.value })
    }
    function startNumValidationHandler() {
        dispatchStartNum({ type: ACTIONS.INPUT_BLUR })
    }

    function closeThisModal() {
        props.expenseNumberingModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerSetExpenseNumbering = (event) => {
        event.preventDefault();
        if (!parseInt(startNumState.value)) {
            toast.error(`Error: custom start number must be an integer.`);
        }
        if (ALLOWEDNUMSEPARATOR.indexOf(numberSeparatorSelected) < 0) {
            toast.error(`Error: you used an invalid separator.`);
            return;
        }
        if (ALLOWEDNUMDIGITS.indexOf(numDigitsSelected) < 0) {
            toast.error(`Error: you used an invalid number of digits.`);
            return;
        }
        if (ALLOWEDYEARDIGITS.indexOf(yearDigitsSelected) < 0) {
            toast.error(`Error: you used an invalid number of year digits.`);
            return;
        }
        if (ALLOWEDEXPENSENUMTYPES.indexOf(expenseNumberTypeSelected) < 0) {
            toast.error(`Error: you used an invalid number type.`);
            return;
        }
        if (prefixState.length > MAX_PREFIX_LENGTH) {
            toast.error(`Error: the length of your prefix is invalid.`);
            return;
        }

        dispatch(addSelectedExpenseNumberingPreference(selectedWorkspace.uuid, parseInt(numDigitsSelected), expenseNumberTypeSelected, parseInt(startNumState.value), parseInt(yearDigitsSelected), numberSeparatorSelected, prefixState.value));

        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerSetExpenseNumbering}>
                <div className="Modal-Heading">
                    <h2>Set Expense Numbering Format</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <div className="Modal-SubHeading-Container-NoSpace">
                    <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                    <p className="Modal-SubHeading-NoSpace"><b>Current format: {currentFormatState}</b></p>
                </div>

                <div className="Modal-InformationGroupingDiv">
                    <p>How many digits should the expense number have?</p>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="3digits" name="numOfDigits" value="3" checked={numDigitsSelected === '3'} onChange={handleNumDigitsSelected} />
                        <label htmlFor="3digits">3 digits. <span className="Modal-SpanExample">Example: 001.</span></label>
                    </div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="4digits" name="numOfDigits" value="4" checked={numDigitsSelected === '4'} onChange={handleNumDigitsSelected} />
                        <label htmlFor="4digits">4 digits. <span className="Modal-SpanExample">Example: 0001.</span></label>
                    </div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="5digits" name="numOfDigits" value="5" checked={numDigitsSelected === '5'} onChange={handleNumDigitsSelected} />
                        <label htmlFor="5digits">5 digits. <span className="Modal-SpanExample">Example: 00001.</span></label>
                    </div>
                </div>

                <div className="Modal-InformationGroupingDiv">
                    <p>Choose the preferred way you would like your invoices to be numbered:</p>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="YMN" name="expenseNumberType" value="YMN" checked={expenseNumberTypeSelected === 'YMN'} onChange={handleExpenseNumberTypeSelected} />
                        <label htmlFor="YMN">include year and month in expense number. <span className="Modal-SpanExample">Example: 202312001.</span></label>
                    </div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="YN" name="expenseNumberType" value="YN" checked={expenseNumberTypeSelected === 'YN'} onChange={handleExpenseNumberTypeSelected} />
                        <label htmlFor="YN">include year in expense number. <span className="Modal-SpanExample">Example: 2023001.</span></label>
                    </div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="N" name="expenseNumberType" value="N" checked={expenseNumberTypeSelected === 'N'} onChange={handleExpenseNumberTypeSelected} />
                        <label htmlFor="N">use number only. <span className="Modal-SpanExample">Example: 001. [Not recommended!]</span></label>
                    </div>
                </div>
                {
                    (expenseNumberTypeSelected !== 'N') && (
                        <div className="Modal-InformationGroupingDiv Modal-DropdownContainerForFurtherInput">
                            <p>Choose number of year digits:</p>
                            <div className="Modal-RadioBtnContainer">
                                <input type="radio" id="y2" name="yearDigits" value="2" checked={yearDigitsSelected === '2'} onChange={handleYearDigitsSelected} />
                                <label htmlFor="y2">2-digits. <span className="Modal-SpanExample">Example: 23001 or 2301001.</span></label>
                            </div>
                            <div className="Modal-RadioBtnContainer">
                                <input type="radio" id="y4" name="yearDigits" value="4" checked={yearDigitsSelected === '4'} onChange={handleYearDigitsSelected} />
                                <label htmlFor="y4">4-digits. <span className="Modal-SpanExample">Example: 2023001 or 202301001.</span></label>
                            </div>
                        </div>
                    )
                }
                {
                    (expenseNumberTypeSelected === 'N') && (
                        <div className="Modal-CheckboxContainer Modal-DropdownContainerForFurtherInput">
                            <div className="Modal-CheckboxContainer">
                                <input type="checkbox" id="includeCustomNumber" name="includeCustomNumber" value="includeCustomNumber" checked={startNumState.selected} onChange={startNumberSelectionHandler} />
                                <label htmlFor="includeCustomNumber">Custom start number</label>
                            </div>
                            {startNumState.selected && (
                                <div className="Modal-InputContainer">
                                    <label htmlFor="customNumber">Start numbering from:</label>
                                    <input type="number" id="customNumber" name="customNumber" minLength="1" maxLength={MAX_START_NUMBER_LENGTH} min="1" max={"9".repeat(parseInt(MAX_START_NUMBER_LENGTH))} onChange={startNumChangeHandler} onBlur={startNumValidationHandler} value={startNumState.value} className={`${startNumState.isValid === false ? "Modal-InputField-invalid" : ""}`} />
                                </div>
                            )}
                        </div>
                    )
                }

                <div className="Modal-InformationGroupingDiv">
                    <p>Would you like to use a number separator?</p>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="hyphen" name="numberSeparator" value="-" checked={numberSeparatorSelected === '-'} onChange={handleNumberSeparatorSelected} />
                        <label htmlFor="hyphen">Separate using hyphen. <span className="Modal-SpanExample">Example: 2023-001 or 2023-01-001.</span></label>
                    </div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="slash" name="numberSeparator" value="/" checked={numberSeparatorSelected === '/'} onChange={handleNumberSeparatorSelected} />
                        <label htmlFor="slash">Separate using slash. <span className="Modal-SpanExample">Example: 2023/001 or 2023/01/001.</span></label></div>
                    <div className="Modal-RadioBtnContainer">
                        <input type="radio" id="noSeparator" name="numberSeparator" value="" checked={numberSeparatorSelected === ''} onChange={handleNumberSeparatorSelected} />
                        <label htmlFor="noSeparator">No separator. <span className="Modal-SpanExample">Example: 2023001 or 202301001.</span></label></div>
                </div>

                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="includePrefix" name="includePrefix" value="includePrefix" checked={prefixState.selected} onChange={prefixSelectionHandler} />
                        <label htmlFor="includePrefix"> Include custom prefix</label>
                    </div>
                    {prefixState.selected && (
                        <div className="Modal-InputContainer">
                            <label htmlFor="prefix">Prefix number with:</label>
                            <input type="text" id="prefix" name="prefix" minLength="1" maxLength={MAX_PREFIX_LENGTH} onChange={prefixChangeHandler} onBlur={prefixValidationHandler} value={prefixState.value} className={`${prefixState.isValid === false ? "Modal-InputField-invalid" : ""}`} />
                        </div>
                    )}
                </div>

                <button type="submit" className="Modal-PrimaryBtn" disabled={!formIsValid}>Select format</button>

            </form>
        </ModalWrapper>
    )
}

export default ModalSetExpenseNumbering;
