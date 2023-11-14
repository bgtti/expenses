import { useState, lazy, Suspense } from "react";
// import ModalAddExpense from "./ModalAddExpense";
import ExpensesTable from "./ExpensesTable"
import ExpensesFilter from "./ExpensesFilter";
import AddButton from "../../Components/AddButton";
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "./Expenses.css"

// Lazy load ModalAddExpense component
const ModalAddExpense = lazy(() => import("./ModalAddExpense"));

function Expenses(props) {
    // const styleClasses = 'Expenses ' + props.className;

    const [modalAddExpenseStatus, setModalAddExpenseStatus] = useState(false);

    function addExpenseModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    }


    return (
        <section className={`Expenses ${props.className} Common-expand-flex-1 Common-padding`}>
            <Suspense fallback={<div>Loading...</div>}>
                {modalAddExpenseStatus && (
                    <ModalAddExpense
                        className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : ""}
                        addExpenseModalToggler={addExpenseModalToggler}
                    />
                )}
            </Suspense>
            <button className="Expenses-AddExpenseBtn Common-button-primary AddButton" onClick={addExpenseModalToggler}>
                <img src={AddIcon} alt="Add icon" />
                Add new expense
            </button>
            <ExpensesFilter></ExpensesFilter>
            <h2>Expenses Table</h2>
            <ExpensesTable></ExpensesTable>
        </section>
    )
}
export default Expenses

