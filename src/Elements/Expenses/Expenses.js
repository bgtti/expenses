import ExpensesTable from "./ExpensesTable.js"
import ExpensesFilter from "./ExpensesFilter.js";
import AddButton from "../GeneralUI/AddButton";
import AddIcon from "../../Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../Styles/Expenses.css"
function Expenses(props) {
    const styleClasses = 'Expenses ' + props.className;
    return (
        <section className={styleClasses}>
            <AddButton name="Add new expense" btnAction="open" onClickFunction={props.addExpenseModalToggler} className="Expenses-AddExpenseBtn"><img src={AddIcon} alt="Add icon" /></AddButton>
            <ExpensesFilter></ExpensesFilter>
            <h2>Expenses Table</h2>
            <ExpensesTable></ExpensesTable>
        </section>
    )
}
export default Expenses