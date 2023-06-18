import { useState } from "react";
import arrowIcon from '../../Assets/Images/arrow.png' //Source: Arrow icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/arrow
import filterIcon from '../../Assets/Images/search.png' //Source: Search icons created by Smashicons - Flaticon, from https://www.flaticon.com/free-icons/search
import AddButton from "../../Components/AddButton.js";
import "../../Assets/Styles/Expenses.css"
function ExpensesFilter() {
    const [filterMenuStatus, setfilterMenuStatus] = useState(false);
    function filterMenuStatusToggler(openOrClose) {
        openOrClose === "close" ? setfilterMenuStatus(false) : setfilterMenuStatus(true);
    }
    return (
        <div className="ExpensesFilter">
            <div className={filterMenuStatus === false ? "ExpensesFilter-Header" : "ExpensesFilter-Header ExpensesFilter-Header-Open"}>
                <div><img src={filterIcon} alt="filter icon" /> <h2>Filter</h2></div>
                <AddButton name="" type="button" className="ExpensesFilter-OpenFilterMenuBtn" btnAction={filterMenuStatus === false ? "open" : "close"} onClickFunction={filterMenuStatusToggler}>
                    <img src={arrowIcon} alt="Open Menu" />
                </AddButton>
            </div>
            <form action="" className={filterMenuStatus === false ? "ExpensesFilter-FormClosed" : "ExpensesFilter-Form"}>
                <fieldset>
                    <legend>Date filter</legend>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="filterExpenseDateStart">From:</label>
                        <input id="filterExpenseDateStart" name="filterExpenseDateStart" type="date" />
                    </div>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="filterExpenseDateEnd">To:</label>
                        <input id="filterExpenseDateEnd" name="filterExpenseDateEnd" type="date" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Keyword filter</legend>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="expenseNrFilter">Expense nr:</label>
                        <input id="expenseNrFilter" name="expenseNrFilter" type="text" />
                    </div>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="expenseDescriptionFilter">Description:</label>
                        <input id="expenseDescriptionFilter" name="expenseDescriptionFilter" type="text" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Exact expense amount filter</legend>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="expenseAmountFilter">Amount:</label>
                        <input id="expenseAmountFilter" name="expenseAmountFilter" type="number" min="0.01" step="0.01" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Assigned labels filter</legend>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="groupFilter">Assign to:</label>
                        <select name="groupFilter" id="groupFilter">
                            <option value="Project 1">Project 1</option>
                            <option value="Project 2">Project 2</option>
                            <option value="Project 3">Project 3</option>
                        </select>
                    </div>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="typeFilter">Expense type:</label>
                        <select name="typeFilter" id="typeFilter">
                            <option value="Utilities">Utilities</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Rent">Rent</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="ExpensesFilter-InputContainer">
                        <label htmlFor="accountFilter">Expense type:</label>
                        <select name="accountFilter" id="accountFilter">
                            <option value="Bank">Bank</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                </fieldset>
                <AddButton type="submit" name="Apply filters" btnAction="open" className="ExpensesFilter-ApplyFilterBtn"></AddButton>
            </form>
        </div>
    )
}
export default ExpensesFilter

