import ExpenseItem from "./Expenses-ExpenseItem"
import ExpensesData from "../Data/ExpenseData"
import "../../Styles/Expenses.css"
function Expenses() {
    return (
        <table className="Expenses">
            <thead>
                <tr className="Expenses-Header">
                    <th>Date</th>
                    <th>Expense Nr</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Project</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <ExpenseItem exDate={ExpensesData[0].exDate} exNr={ExpensesData[0].exNr} exDescription={ExpensesData[0].exDescription} exAmount={ExpensesData[0].exAmount} project={ExpensesData[0].project} type={ExpensesData[0].type}></ExpenseItem>
                <ExpenseItem exDate={ExpensesData[1].exDate} exNr={ExpensesData[1].exNr} exDescription={ExpensesData[1].exDescription} exAmount={ExpensesData[1].exAmount} project={ExpensesData[1].project} type={ExpensesData[1].type}></ExpenseItem>
            </tbody>

        </table>
    )
}
export default Expenses