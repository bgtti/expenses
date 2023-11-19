import ExpenseItem from "./ExpensesItem"
import ExpensesData from "../../Data/ExpenseData"
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
                    <th>Category</th>
                    <th>Group</th>
                    <th>Account</th>
                    <th>Tags</th>
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
                            category={expense.type}
                            project={expense.project}
                            account={expense.account}
                            tag={expense.tag ? expense.tag : ""}>
                        </ExpenseItem>
                    )))
                }


            </tbody>

        </table>
    )
}
export default ExpensesTable