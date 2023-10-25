import { useState } from "react";
import ExpensesData from "../../Data/ExpenseData"
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    const [enteredDate, setDate] = useState('');
    const [enteredDescription, setDescription] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredProject, setProject] = useState('');
    const [enteredType, setType] = useState('');
    const [enteredAccount, setAccount] = useState('');

    function dateChangeHandler(e) {
        setDate(e.target.value);
    }
    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }
    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }
    function projectChangeHandler(e) {
        setProject(e.target.value);
    }
    function typeChangeHandler(e) {
        setType(e.target.value);
    }
    function accountChangeHandler(e) {
        setAccount(e.target.value);
    }
    function closeThisModal() {
        props.addExpenseModalToggler("close");
        setDate('');
        setDescription('');
        setAmount('');
        setProject('');
        setType('');
        setAccount('');
    }
    async function getUniqueInvoiceNr(theDate) {
        let invoicePrefix = `${theDate.getFullYear().toString().slice(-2)}-${("0" + (theDate.getMonth() + 1)).slice(-2)}`;
        let invoiceNrCounter = 1;
        let tentativeNum = "00" + ((ExpensesData.filter(e => e.exNr.includes(invoicePrefix)).length) + invoiceNrCounter);
        if (parseInt(tentativeNum) < 1000) { tentativeNum.slice(-3) };

        let tentativeInvoiceNum = `${invoicePrefix}-${tentativeNum}`;

        if (ExpensesData.filter(e => e.exNr === tentativeInvoiceNum).length === 0) {
            return tentativeInvoiceNum;

        } else {
            let arrayOfInvoiceNums = (ExpensesData.filter(e => e.exNr.includes(invoicePrefix))).map((e) => { return parseInt(e.exNr.slice(6)) });
            let greatestInvoiceNum = Math.max(...arrayOfInvoiceNums);

            tentativeNum = "00" + (greatestInvoiceNum + 1);
            if (parseInt(tentativeNum) < 1000) { tentativeNum.slice(-3) };
            tentativeInvoiceNum = `${invoicePrefix}-${tentativeNum}`;

            return tentativeInvoiceNum;
        }
    }

    async function getUniqueExpenseNr() {
        let arrayOfExpenseNums = ExpensesData.map((e) => { return parseInt(e.id.slice(2)) });
        let getBiggestNr = Math.max(...arrayOfExpenseNums);
        let newExpNr = `ex${getBiggestNr + 1}`;
        return newExpNr;
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        const newExpense = {
            id: 'X', // defined bellow
            exDate: new Date(enteredDate),
            exNr: 'X', //defined bellow
            exDescription: enteredDescription,
            exAmount: enteredAmount,
            project: enteredProject, //dont forget to account for "" ********************
            type: enteredType, //dont forget to account for "" *****************
            account: enteredAccount
        }
        let expenseNr = await getUniqueExpenseNr();
        newExpense.id = expenseNr;

        let invoiceNr = await getUniqueInvoiceNr(newExpense.exDate);
        newExpense.exNr = invoiceNr;

        ExpensesData.push(newExpense);

        console.log(ExpensesData);

        //next part to be replaced with closeThisModal:
        setDate("");
        setDescription("");
        setAmount("");
        setProject(""); //project and type wont reset and jsx, fix
        setType("");
        setAccount("");
    }

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandler}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add expense</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDate">Date:</label>
                    <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" value={enteredDescription} onChange={descriptionChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseAmount">Amount:</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.01" step="0.01"
                        value={enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="group">Assign to:</label>
                    <select name="group" id="group" onChange={projectChangeHandler} value={enteredProject === "" ? "Project 1" : enteredProject}>
                        <option value="Project 1">Project 1</option>
                        <option value="Project 2">Project 2</option>
                        <option value="Project 3">Project 3</option>
                    </select>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="type">Expense type:</label>
                    <select name="type" id="type" onChange={typeChangeHandler} value={enteredType === "" ? "Other" : enteredType}>
                        <option value="Utilities">Utilities</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Rent">Rent</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="account">Expense account:</label>
                    <select name="account" id="account" onChange={accountChangeHandler} value={enteredAccount === "" ? "Bank" : enteredAccount}>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddExpense;
