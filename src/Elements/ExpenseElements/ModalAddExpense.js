import ModalWrapper from "../GeneralUI/ModalWrapper";
import closeIcon from "../../Images/close.png"
import "../../Styles/ModalAddExpense.css"

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    return (
        <ModalWrapper className={styleClasses}>
            <form className="ModalAddExpense-Form">
                <img src={closeIcon} alt="close modal" className="ModalAddExpense-CloseModalIcon" />
                <h2>Add expense</h2>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseDate">Date:</label>
                    <input id="expenseDate" name="expenseDate" type="date" />
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" />
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseAmount">Amount:</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.01" step="0.01" />
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="project">Assign to:</label>
                    <select name="project" id="project">
                        <option value="Project 1">Project 1</option>
                        <option value="Project 2">Project 2</option>
                        <option value="Project 3">Project 3</option>
                    </select>
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="type">Assign to:</label>
                    <select name="type" id="type">
                        <option value="Utilities">Utilities</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Rent">Rent</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="ModalAddExpense-AddExpenseBtn">Add expense</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddExpense;

//<a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Pixel perfect - Flaticon</a>