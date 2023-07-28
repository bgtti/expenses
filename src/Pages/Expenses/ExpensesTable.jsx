import ExpenseItem from "./ExpensesItem"
import ExpensesData from "../../data/ExpenseData"
import "./Expenses.css"
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
                {ExpensesData.length === 0 ? (
                    <p>No expenses found.</p>
                ) : (
                    ExpensesData.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            exDate={expense.exDate}
                            exNr={expense.exNr}
                            exDescription={expense.exDescription}
                            exAmount={expense.exAmount}
                            project={expense.project}
                            type={expense.type}
                            account={expense.account}>
                        </ExpenseItem>
                    )))
                }
                
                
            </tbody>

        </table>
    )
}
export default ExpensesTable