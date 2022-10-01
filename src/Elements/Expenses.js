import ExpenseItem from "./Expenses-ExpenseItem"
import "../Styles/Expenses.css"
function Expenses() {
    return (
        <table className="Expenses">
            <tr className="Expenses-Header">
                <th>Date</th>
                <th>Expense Nr</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Project</th>
                <th>Type</th>
            </tr>
            <ExpenseItem ></ExpenseItem>
            <ExpenseItem ></ExpenseItem>
            <ExpenseItem ></ExpenseItem>
        </table>
    )
}
export default Expenses