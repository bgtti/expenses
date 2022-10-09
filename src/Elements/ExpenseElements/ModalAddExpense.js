import { useState } from "react";
import ModalWrapper from "../GeneralUI/ModalWrapper";
import closeIcon from "../../Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Styles/ModalAddExpense.css"

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    const [enteredDate, setDate] = useState('');
    const [enteredDescription, setDescription] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredProject, setProject] = useState('');
    const [enteredType, setType] = useState('');

    function dateChangeHandler (e){
        setDate(e.target.value);
    }
    function descriptionChangeHandler (e){
        setDescription(e.target.value);
    }
    function amountChangeHandler (e){
        setAmount(e.target.value);
    }
    function projectChangeHandler (e){
        setProject(e.target.value);
    }
    function typeChangeHandler (e){
        setType(e.target.value);
    }
    function closeThisModal(){
        props.addExpenseModalToggler("close")
    }
    function formSubmitHandler (e){
        e.preventDefault();
        const newExpense = {
            id: 'exX', // change!!
            exDate: new Date(enteredDate),
            exNr: "22-10-XXX", //change!!!
            exDescription: enteredDescription,
            exAmount: enteredAmount,
            project: enteredProject, //dont forget to account for ""
            type: enteredType
        }   
        setDate("");
        setDescription("");
        setAmount("");
        setProject(""); //project and type wont reset and jsx, fix
        setType(""); 
console.log(newExpense)
    }
    return (
        <ModalWrapper className={styleClasses}>
            <form className="ModalAddExpense-Form" onSubmit={formSubmitHandler}>
                <img src={closeIcon} alt="close modal" className="ModalAddExpense-CloseModalIcon" onClick={closeThisModal}/>
                <h2>Add expense</h2>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseDate">Date:</label>
                    <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler}/>
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" value={enteredDescription} onChange={descriptionChangeHandler}/>
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="expenseAmount">Amount:</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.01" step="0.01" 
                   value={enteredAmount} onChange={amountChangeHandler}/>
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="project">Assign to:</label>
                    <select name="project" id="project" onChange={projectChangeHandler}>
                        <option value="Project 1">Project 1</option>
                        <option value="Project 2">Project 2</option>
                        <option value="Project 3">Project 3</option>
                    </select>
                </div>
                <div className="ModalAddExpense-InputContainer">
                    <label htmlFor="type">Expense type:</label>
                    <select name="type" id="type" onChange={typeChangeHandler}>
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
