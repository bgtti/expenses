// import { useState } from "react";
// import ExpensesData from "../../Data/ExpenseData";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"

function ModalAddWorkspace(props) {
    const styleClasses = 'ModalAddWorkspace ' + props.className;
    // const [enteredDate, setDate] = useState('');

    // function dateChangeHandler(e) {
    //     setDate(e.target.value);
    // }
    
    function closeThisModal() {
        props.addWorkspaceModalToggler("close");
        // setDate('');
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        // const newExpense = {
        //     id: 'X', // defined bellow
        //     exDate: new Date(enteredDate),
        // }
        //next part to be replaced with closeThisModal:
        // setDate("");
    }

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandler}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add Work Space</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDate">Date:</label>
                    {/* <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} /> */}
                    <input id="expenseDate" name="expenseDate" type="date" />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" />
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddWorkspace;
