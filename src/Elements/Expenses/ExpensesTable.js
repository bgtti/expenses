import ExpenseItem from "./ExpensesItem"
import ExpensesData from "../Data/ExpenseData"
import "../../Styles/Expenses.css"
function ExpensesTable() {
    return (
        <table className="ExpensesTable">
            <thead>
                <tr className="ExpensesTable-Header">
                    <th>Date</th>
                    <th>Expense Nr</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Group</th>
                    <th>Type</th>
                    <th>Account</th>
                </tr>
            </thead>
            <tbody>
                <ExpenseItem exDate={ExpensesData[0].exDate} exNr={ExpensesData[0].exNr} exDescription={ExpensesData[0].exDescription} exAmount={ExpensesData[0].exAmount} project={ExpensesData[0].project} type={ExpensesData[0].type} account={ExpensesData[0].account}></ExpenseItem>
                <ExpenseItem exDate={ExpensesData[1].exDate} exNr={ExpensesData[1].exNr} exDescription={ExpensesData[1].exDescription} exAmount={ExpensesData[1].exAmount} project={ExpensesData[1].project} type={ExpensesData[1].type} account={ExpensesData[1].account}></ExpenseItem>
            </tbody>

        </table>
    )
}
export default ExpensesTable