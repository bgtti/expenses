import { useState } from "react";
import ModalAddExpense from "./ModalAddExpense";
import ExpensesTable from "./ExpensesTable"
import ExpensesFilter from "./ExpensesFilter";
import AddButton from "../../Components/AddButton";
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../Assets/Styles/Expenses.css"
import "../../Assets/Styles/Home.css";

function Expenses(props) {
    // const styleClasses = 'Expenses ' + props.className;

    const [modalAddExpenseStatus, setModalAddExpenseStatus] = useState(false);
    // const [settingsStatus, setSettingsStatus] = useState(false);

    function addExpenseModalToggler(openOrClose) {
        console.log(modalAddExpenseStatus)
        openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    }
    // function settingsToggler(openOrClose) {
    //     openOrClose === "close" ? setSettingsStatus(false) : setSettingsStatus(true);
    // }

    return (
        <section className={`Expenses ${props.className} Common-expand-flex-1 Common-padding`}> 
            <ModalAddExpense
                className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : ""}
                addExpenseModalToggler={addExpenseModalToggler}>
            </ModalAddExpense>
            <AddButton 
                name="Add new expense" btnAction="open" className="Expenses-AddExpenseBtn Common-button-primary"
                onClickFunction={addExpenseModalToggler}><img src={AddIcon} alt="Add icon" /></AddButton>
            <ExpensesFilter></ExpensesFilter>
            <h2>Expenses Table</h2>
            <ExpensesTable></ExpensesTable>
        </section>
    )
}
export default Expenses

    