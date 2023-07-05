import { useState } from "react";
// import ExpensesData from "../../Data/ExpenseData";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"
import currency_list from "../../../data/currencyList";

function ModalAddWorkspace(props) {
    const styleClasses = 'ModalAddWorkspace ' + props.className;
    const [enteredName, setName] = useState('');
    const [enteredAbbrev, setAbbrev] = useState('');
    const [enteredCurrency, setCurrency] = useState('');

    function nameChangeHandler(e) {
        setName(e.target.value);
    }
    function abbrevChangeHandler(e) {
        setAbbrev(e.target.value);
    }
    function currencyChangeHandler(e) {
        setCurrency(e.target.value);
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        const newWorkspace = {
            name: enteredName, // defined bellow
            abbreviation: enteredAbbrev,
            currency: enteredCurrency,
        }
        //SEND TO BE
        //next part to be replaced with closeThisModal:
        setName("");
        setAbbrev("");
        setCurrency("");
    }
    function closeThisModal() {
        props.addWorkspaceModalToggler("close");
        setName("");
        setAbbrev("");
        setCurrency("");
    }

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandler}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add Work Space</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceName">Name*:</label>
                    <input id="workspaceName" name="workspaceName" type="text" maxlength="200" onChange={nameChangeHandler}/>
                    {/* <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} /> */}
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceAbbreviation">Abbreviation*:</label>
                    <input id="workspaceAbbreviation" name="workspaceAbbreviation" type="text" maxlength="5" onChange={abbrevChangeHandler}/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceCurrency">Currency*:</label>
                    <select name="workspaceCurrency" id="workspaceCurrency" onChange={currencyChangeHandler}>
                        {currency_list.map((currency)=>(
                            <option value={currency.code}>{currency.code} ({currency.name})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add Work Space</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddWorkspace;
